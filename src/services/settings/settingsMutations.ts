
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Setting } from "./settingsQueries";

/**
 * Updates a setting value
 */
export const updateSetting = async (key: string, value: any): Promise<Setting | null> => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .update({
        value,
        updated_at: new Date().toISOString()
      })
      .eq('key', key)
      .select();
    
    if (error) throw error;
    toast.success('Configuración actualizada correctamente');
    return data?.[0] || null;
  } catch (error) {
    console.error('Error updating setting:', error);
    toast.error('Error al actualizar la configuración');
    return null;
  }
};

/**
 * Creates a new setting
 */
export const createSetting = async (settingData: Omit<Setting, 'id' | 'updated_at'>): Promise<Setting | null> => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .insert(settingData)
      .select();
    
    if (error) throw error;
    toast.success('Configuración creada correctamente');
    return data?.[0] || null;
  } catch (error) {
    console.error('Error creating setting:', error);
    toast.error('Error al crear la configuración');
    return null;
  }
};

/**
 * Deletes a setting
 */
export const deleteSetting = async (key: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('settings')
      .delete()
      .eq('key', key);
    
    if (error) throw error;
    toast.success('Configuración eliminada correctamente');
    return true;
  } catch (error) {
    console.error('Error deleting setting:', error);
    toast.error('Error al eliminar la configuración');
    return false;
  }
};
