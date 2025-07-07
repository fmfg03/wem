import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, Eye, FileText, Image, PlusCircle, Calendar } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Card } from '@/components/ui/card';
import MediaUpload, { MediaFile } from '@/components/admin/MediaUpload';
import MediaLibrary from '@/components/admin/MediaLibrary';
import { toast } from 'sonner';

// Mock blog posts data
const mockBlogPosts = [
  {
    id: 1,
    title: "Mantenimiento preventivo de bombas industriales",
    author: "Juan Pérez",
    category: "Mantenimiento",
    tags: ["bombas", "industrial", "mantenimiento"],
    status: "published",
    date: "2024-04-10",
  },
  {
    id: 2,
    title: "Guía completa de válvulas de control",
    author: "María Rodríguez",
    category: "Guías",
    tags: ["válvulas", "control", "industrial"],
    status: "draft",
    date: "2024-04-05",
  },
  {
    id: 3,
    title: "Nuevas tecnologías en tratamiento de agua",
    author: "Roberto González",
    category: "Tecnología",
    tags: ["agua", "tratamiento", "tecnología"],
    status: "published",
    date: "2024-03-28",
  },
  {
    id: 4,
    title: "Cómo elegir la bomba adecuada para tu proyecto",
    author: "Luisa Martínez",
    category: "Guías",
    tags: ["bombas", "proyectos", "selección"],
    status: "published",
    date: "2024-03-15",
  }
];

// Mock pages data
const mockPages = [
  {
    id: 1,
    title: "Inicio",
    slug: "/",
    lastUpdated: "2024-04-01",
    sections: ["Hero", "Featured Products", "Categories", "Testimonials"]
  },
  {
    id: 2,
    title: "Sobre Nosotros",
    slug: "/sobre-nosotros",
    lastUpdated: "2024-03-20",
    sections: ["Mission", "Team", "History", "Facilities"]
  },
  {
    id: 3,
    title: "Contacto",
    slug: "/contacto",
    lastUpdated: "2024-03-15",
    sections: ["Contact Form", "Map", "Office Locations"]
  },
  {
    id: 4,
    title: "Mayoreo",
    slug: "/mayoreo",
    lastUpdated: "2024-04-05",
    sections: ["Hero", "Advantages", "Categories", "Calculator", "FAQ"]
  }
];

// Initial mock media files with added altText property
const initialMediaFiles: MediaFile[] = [
  {
    id: '1',
    name: 'producto-1.jpg',
    type: 'image/jpeg',
    size: 122880, // 120 KB
    url: '/placeholder.svg',
    uploadDate: '2024-04-10T10:30:00Z',
    altText: 'Imagen de producto 1'
  },
  {
    id: '2',
    name: 'banner-home.jpg',
    type: 'image/jpeg',
    size: 245760, // 240 KB
    url: '/placeholder.svg',
    uploadDate: '2024-04-05T14:20:00Z',
    altText: 'Banner para la página de inicio'
  },
  {
    id: '3',
    name: 'logo-empresa.png',
    type: 'image/png',
    size: 81920, // 80 KB
    url: '/placeholder.svg',
    uploadDate: '2024-04-01T09:15:00Z',
    altText: 'Logo de la empresa'
  }
];

const AdminContent = () => {
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [pages, setPages] = useState(mockPages);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaSearchTerm, setMediaSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('blog');
  const [isAddBlogDialogOpen, setIsAddBlogDialogOpen] = useState(false);
  const [isEditPageDialogOpen, setIsEditPageDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<typeof mockPages[0] | null>(null);
  const [isUploadMediaDialogOpen, setIsUploadMediaDialogOpen] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialMediaFiles);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    status: 'draft'
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBlogPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBlogPost = () => {
    const newId = Math.max(...blogPosts.map(p => p.id)) + 1;
    const newPost = {
      id: newId,
      title: newBlogPost.title,
      author: "Admin", // Default author for simplicity
      category: newBlogPost.category,
      tags: newBlogPost.tags.split(',').map(tag => tag.trim()),
      status: newBlogPost.status,
      date: new Date().toISOString().slice(0, 10),
    };
    
    setBlogPosts([...blogPosts, newPost]);
    setNewBlogPost({
      title: '',
      content: '',
      category: '',
      tags: '',
      status: 'draft'
    });
    setIsAddBlogDialogOpen(false);
    toast.success('Post de blog creado correctamente');
  };

  const handleEditPage = (page: typeof mockPages[0]) => {
    setEditingPage(page);
    setIsEditPageDialogOpen(true);
  };

  const handleEditPageSave = () => {
    if (editingPage) {
      setPages(pages.map(p => p.id === editingPage.id ? editingPage : p));
      setIsEditPageDialogOpen(false);
      setEditingPage(null);
      toast.success('Página actualizada correctamente');
    }
  };

  const handleMediaUploadComplete = (file: MediaFile) => {
    setMediaFiles([file, ...mediaFiles]);
    setIsUploadMediaDialogOpen(false);
  };

  const handleDeleteMedia = (id: string) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== id));
    toast.success('Archivo eliminado correctamente');
  };

  const handleUpdateMedia = (updatedFile: MediaFile) => {
    const updatedFiles = mediaFiles.map(file => 
      file.id === updatedFile.id ? updatedFile : file
    );
    setMediaFiles(updatedFiles);
    toast.success('Imagen actualizada correctamente');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Gestión de Contenido</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Tabs defaultValue="blog" onValueChange={setCurrentTab} className="w-full">
            <div className="border-b px-4">
              <TabsList className="h-14">
                <TabsTrigger value="blog" className="data-[state=active]:text-wem-green">
                  <FileText className="mr-2 h-4 w-4" /> 
                  Blog
                </TabsTrigger>
                <TabsTrigger value="pages" className="data-[state=active]:text-wem-green">
                  <FileText className="mr-2 h-4 w-4" /> 
                  Páginas
                </TabsTrigger>
                <TabsTrigger value="media" className="data-[state=active]:text-wem-green">
                  <Image className="mr-2 h-4 w-4" /> 
                  Media
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    placeholder={`Buscar ${currentTab === 'blog' ? 'blog posts' : currentTab === 'pages' ? 'páginas' : 'archivos'}...`}
                    className="pl-10"
                    value={currentTab === 'media' ? mediaSearchTerm : searchTerm}
                    onChange={currentTab === 'media' 
                      ? (e) => setMediaSearchTerm(e.target.value) 
                      : handleSearchChange
                    }
                  />
                </div>
                {currentTab === 'blog' && (
                  <Dialog open={isAddBlogDialogOpen} onOpenChange={setIsAddBlogDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-wem-green hover:bg-wem-green/90">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[650px]">
                      <DialogHeader>
                        <DialogTitle>Crear Nuevo Post</DialogTitle>
                        <DialogDescription>
                          Complete el formulario para crear un nuevo post en el blog.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">Título</Label>
                          <Input
                            id="title"
                            value={newBlogPost.title}
                            onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="content" className="text-right pt-2">Contenido</Label>
                          <Textarea
                            id="content"
                            value={newBlogPost.content}
                            onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
                            className="col-span-3 min-h-[200px]"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category" className="text-right">Categoría</Label>
                          <Input
                            id="category"
                            value={newBlogPost.category}
                            onChange={(e) => setNewBlogPost({...newBlogPost, category: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tags" className="text-right">Etiquetas</Label>
                          <Input
                            id="tags"
                            value={newBlogPost.tags}
                            onChange={(e) => setNewBlogPost({...newBlogPost, tags: e.target.value})}
                            className="col-span-3"
                            placeholder="Separadas por comas"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">Estado</Label>
                          <select
                            id="status"
                            value={newBlogPost.status}
                            onChange={(e) => setNewBlogPost({...newBlogPost, status: e.target.value})}
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="draft">Borrador</option>
                            <option value="published">Publicado</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddBlogDialogOpen(false)}>Cancelar</Button>
                        <Button onClick={handleAddBlogPost}>Publicar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                {currentTab === 'media' && (
                  <Dialog open={isUploadMediaDialogOpen} onOpenChange={setIsUploadMediaDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-wem-green hover:bg-wem-green/90">
                        <Plus className="mr-2 h-4 w-4" /> Subir Media
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px]">
                      <DialogHeader>
                        <DialogTitle>Subir Nuevo Archivo</DialogTitle>
                        <DialogDescription>
                          Sube un nuevo archivo a la biblioteca de medios.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <MediaUpload 
                          onUploadComplete={handleMediaUploadComplete} 
                          isUploading={isUploadingMedia}
                          setIsUploading={setIsUploadingMedia}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
            
            <TabsContent value="blog" className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBlogPosts.length > 0 ? (
                      filteredBlogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.id}</TableCell>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.status === 'published' ? 'Publicado' : 'Borrador'}
                            </span>
                          </TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No se encontraron posts
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="pages" className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Última Actualización</TableHead>
                      <TableHead>Secciones</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPages.length > 0 ? (
                      filteredPages.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium">{page.id}</TableCell>
                          <TableCell>{page.title}</TableCell>
                          <TableCell>{page.slug}</TableCell>
                          <TableCell>{page.lastUpdated}</TableCell>
                          <TableCell>{page.sections.length} secciones</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditPage(page)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No se encontraron páginas
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="p-4">
              <MediaLibrary 
                mediaFiles={mediaFiles}
                onDeleteMedia={handleDeleteMedia}
                searchTerm={mediaSearchTerm}
                onSearchChange={setMediaSearchTerm}
                onUpdateMedia={handleUpdateMedia}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Edit Page Dialog */}
        <Dialog open={isEditPageDialogOpen} onOpenChange={setIsEditPageDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Editar Página</DialogTitle>
              <DialogDescription>
                Modifique los detalles de la página.
              </DialogDescription>
            </DialogHeader>
            {editingPage && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-title" className="text-right">Título</Label>
                  <Input
                    id="edit-title"
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-slug" className="text-right">URL</Label>
                  <Input
                    id="edit-slug"
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({...editingPage, slug: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Secciones</Label>
                  <div className="col-span-3 space-y-2">
                    {editingPage.sections.map((section, index) => (
                      <div key={index} className="flex items-center">
                        <Input
                          value={section}
                          onChange={(e) => {
                            const updatedSections = [...editingPage.sections];
                            updatedSections[index] = e.target.value;
                            setEditingPage({...editingPage, sections: updatedSections});
                          }}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updatedSections = editingPage.sections.filter((_, i) => i !== index);
                            setEditingPage({...editingPage, sections: updatedSections});
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        setEditingPage({
                          ...editingPage,
                          sections: [...editingPage.sections, "Nueva Sección"]
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Añadir Sección
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-date" className="text-right">Última Actualización</Label>
                  <div className="col-span-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <Input
                      id="edit-date"
                      type="date"
                      value={editingPage.lastUpdated}
                      onChange={(e) => setEditingPage({...editingPage, lastUpdated: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditPageDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleEditPageSave}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminContent;
