
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSettingByKey, Setting } from '@/services/settings/settingsQueries';
import { updateSetting } from '@/services/settings/settingsMutations';
import { Switch } from '@/components/ui/switch';

const AdminSettings = () => {
  const queryClient = useQueryClient();
  // Company info state
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: ''
  });

  // Shipping settings state
  const [shippingSettings, setShippingSettings] = useState({
    enabled: false,
    freeShippingThreshold: 1000,
    shippingMethods: [
      { id: '1', name: 'Estándar', price: 150, estimatedDays: '3-5' }
    ]
  });

  // Fetch company settings
  const { data: companySettings, isLoading: isLoadingCompany } = useQuery({
    queryKey: ['settings', 'company_info'],
    queryFn: () => fetchSettingByKey('company_info'),
  });

  // Fetch shipping settings
  const { data: shippingSettingsData, isLoading: isLoadingShipping } = useQuery({
    queryKey: ['settings', 'shipping_settings'],
    queryFn: () => fetchSettingByKey('shipping_settings'),
  });

  // Update state when data is loaded
  React.useEffect(() => {
    if (companySettings && companySettings.value) {
      setCompanyInfo(companySettings.value);
    }
  }, [companySettings]);

  // Update state when shipping settings are loaded
  React.useEffect(() => {
    if (shippingSettingsData && shippingSettingsData.value) {
      setShippingSettings(shippingSettingsData.value);
    }
  }, [shippingSettingsData]);

  const updateSettingMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) => updateSetting(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Configuración guardada correctamente');
    },
    onError: (error) => {
      console.error('Error updating setting:', error);
      toast.error('Error al guardar la configuración');
    }
  });

  const handleCompanyInfoSave = () => {
    updateSettingMutation.mutate({
      key: 'company_info',
      value: companyInfo
    });
  };

  const handleShippingSettingsSave = () => {
    updateSettingMutation.mutate({
      key: 'shipping_settings',
      value: shippingSettings
    });
  };

  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'freeShippingThreshold') {
      setShippingSettings({
        ...shippingSettings,
        [name]: Number(value)
      });
    } else {
      setShippingSettings({
        ...shippingSettings,
        [name]: value
      });
    }
  };

  const handleShippingToggle = (enabled: boolean) => {
    setShippingSettings({
      ...shippingSettings,
      enabled
    });
  };

  const addShippingMethod = () => {
    const newMethod = {
      id: Date.now().toString(),
      name: 'Nuevo método',
      price: 0,
      estimatedDays: '1-3'
    };
    
    setShippingSettings({
      ...shippingSettings,
      shippingMethods: [...shippingSettings.shippingMethods, newMethod]
    });
  };

  const updateShippingMethod = (id: string, field: string, value: string | number) => {
    setShippingSettings({
      ...shippingSettings,
      shippingMethods: shippingSettings.shippingMethods.map(method => 
        method.id === id ? { ...method, [field]: field === 'price' ? Number(value) : value } : method
      )
    });
  };

  const removeShippingMethod = (id: string) => {
    setShippingSettings({
      ...shippingSettings,
      shippingMethods: shippingSettings.shippingMethods.filter(method => method.id !== id)
    });
  };

  return (
    <AdminLayout title="Ajustes">
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="shipping">Envíos</TabsTrigger>
          <TabsTrigger value="payment">Pagos</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Información de la empresa</CardTitle>
              <CardDescription>
                Ajusta la información principal de tu empresa que se mostrará en el sitio web.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 mt-2">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nombre de la empresa</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={companyInfo.name || ''} 
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    rows={4}
                    value={companyInfo.description || ''} 
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={companyInfo.email || ''} 
                      onChange={handleCompanyInfoChange}
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={companyInfo.phone || ''} 
                      onChange={handleCompanyInfoChange}
                    />
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="address">Dirección</Label>
                  <Textarea 
                    id="address" 
                    name="address"
                    value={companyInfo.address || ''} 
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                
                <Button
                  onClick={handleCompanyInfoSave}
                  disabled={updateSettingMutation.isPending}
                  className="w-full md:w-auto"
                >
                  {updateSettingMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Guardar cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de envíos</CardTitle>
              <CardDescription>
                Configura las opciones de envío para tus productos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingShipping ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500 mr-2" />
                  <span>Cargando configuración de envíos...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="shipping-enabled" className="flex flex-col space-y-1">
                      <span>Habilitar envíos</span>
                      <span className="font-normal text-sm text-gray-500">
                        Activa o desactiva la funcionalidad de envíos en tu tienda
                      </span>
                    </Label>
                    <Switch
                      id="shipping-enabled"
                      checked={shippingSettings.enabled}
                      onCheckedChange={handleShippingToggle}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold">Umbral para envío gratuito (MXN)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        id="freeShippingThreshold"
                        name="freeShippingThreshold"
                        type="number"
                        value={shippingSettings.freeShippingThreshold}
                        onChange={handleShippingChange}
                        min={0}
                      />
                      <div className="text-sm text-gray-500 flex items-center">
                        Los pedidos superiores a este monto tendrán envío gratuito
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Métodos de envío</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addShippingMethod}
                        className="flex items-center gap-1"
                      >
                        <PlusCircle className="h-4 w-4" />
                        Agregar método
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {shippingSettings.shippingMethods.map((method) => (
                        <div 
                          key={method.id} 
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-md"
                        >
                          <div>
                            <Label htmlFor={`method-name-${method.id}`} className="mb-2 block">Nombre</Label>
                            <Input
                              id={`method-name-${method.id}`}
                              value={method.name}
                              onChange={(e) => updateShippingMethod(method.id, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`method-price-${method.id}`} className="mb-2 block">Precio (MXN)</Label>
                            <Input
                              id={`method-price-${method.id}`}
                              type="number"
                              value={method.price}
                              onChange={(e) => updateShippingMethod(method.id, 'price', e.target.value)}
                              min={0}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`method-days-${method.id}`} className="mb-2 block">Tiempo estimado (días)</Label>
                            <Input
                              id={`method-days-${method.id}`}
                              value={method.estimatedDays}
                              onChange={(e) => updateShippingMethod(method.id, 'estimatedDays', e.target.value)}
                              placeholder="ej. 1-3"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeShippingMethod(method.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleShippingSettingsSave}
                    disabled={updateSettingMutation.isPending}
                    className="w-full md:w-auto mt-4"
                  >
                    {updateSettingMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Guardar configuración de envíos
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de pagos</CardTitle>
              <CardDescription>
                Configura las opciones de pago para tu tienda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-gray-500 italic">Configuración de pagos en desarrollo.</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de correo</CardTitle>
              <CardDescription>
                Configura las plantillas de correo y notificaciones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-gray-500 italic">Configuración de correo en desarrollo.</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
