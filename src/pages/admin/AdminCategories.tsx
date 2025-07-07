
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/contexts/ProductContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PRODUCT_TYPES } from '@/data/productData';

interface Category {
  name: string;
  productCount: number;
  slug: string;
}

const AdminCategories = () => {
  const { products, refreshProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Force refresh products when the component mounts
  useEffect(() => {
    refreshProducts();
  }, []); // Only run on mount
  
  // Create categories list from products and PRODUCT_TYPES
  const categories: Category[] = PRODUCT_TYPES.map(type => {
    const count = products.filter(p => p.category === type.name).length;
    return {
      name: type.name,
      productCount: count,
      slug: type.id
    };
  });
    
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteCategoryName, setDeleteCategoryName] = useState<string | null>(null);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClick = (categoryName: string) => {
    setDeleteCategoryName(categoryName);
    setIsDeleteDialogOpen(true);
  };

  console.log("Categories in Admin:", categories);
  
  return (
    <AdminLayout title="Gestión de Categorías">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center border-b">
          <div className="relative flex-1 mb-4 md:mb-0 md:mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Buscar categorías..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-wem-green hover:bg-wem-green/90 whitespace-nowrap w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Agregar Categoría
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Agregar Nueva Categoría</DialogTitle>
                <DialogDescription>
                  Complete el formulario para agregar una nueva categoría de productos.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Nombre</Label>
                  <Input
                    id="name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                <Button onClick={() => {
                  toast.info("Funcionalidad en desarrollo");
                  setIsAddDialogOpen(false);
                  setNewCategory('');
                }}>
                  Guardar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Productos</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow key={category.name}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="text-right">{category.productCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditClick(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteClick(category.name)}
                          disabled={category.productCount > 0}
                          title={category.productCount > 0 ? "No se puede eliminar una categoría con productos" : "Eliminar categoría"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No se encontraron categorías
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Mostrando {filteredCategories.length} de {categories.length} categorías
          </div>
        </div>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Categoría</DialogTitle>
            <DialogDescription>
              Modifique el nombre de la categoría.
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Nombre</Label>
                <Input
                  id="edit-name"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => {
              toast.info("Funcionalidad en desarrollo");
              setIsEditDialogOpen(false);
              setEditingCategory(null);
            }}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea eliminar esta categoría? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => {
              toast.info("Funcionalidad en desarrollo");
              setIsDeleteDialogOpen(false);
              setDeleteCategoryName(null);
            }}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCategories;
