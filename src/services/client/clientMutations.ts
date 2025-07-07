
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Creates a new client in the database
 */
export const createClient = async (clientData) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert(clientData)
      .select();
    
    if (error) throw error;
    toast.success('Cliente creado correctamente');
    return data?.[0] || null;
  } catch (error) {
    console.error('Error creating client:', error);
    toast.error('Error al crear el cliente');
    return null;
  }
};

/**
 * Updates an existing client in the database
 */
export const updateClient = async (id, clientData) => {
  try {
    // Make sure to include updated_at timestamp
    const dataWithTimestamp = {
      ...clientData,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('clients')
      .update(dataWithTimestamp)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    toast.success('Cliente actualizado correctamente');
    return data?.[0] || null;
  } catch (error) {
    console.error('Error updating client:', error);
    toast.error('Error al actualizar el cliente');
    return null;
  }
};

/**
 * Deletes a client from the database
 */
export const deleteClient = async (id) => {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    toast.success('Cliente eliminado correctamente');
    return true;
  } catch (error) {
    console.error('Error deleting client:', error);
    toast.error('Error al eliminar el cliente');
    return false;
  }
};
