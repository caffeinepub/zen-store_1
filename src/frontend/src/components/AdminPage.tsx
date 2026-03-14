import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, Pencil, Plus, Shield, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";

const ADMIN_PASSWORD = "zen-admin-2024";

type ProductForm = {
  name: string;
  priceDisplay: string;
  category: string;
  description: string;
  imageUrl: string;
  stock: string;
  featured: boolean;
};

const EMPTY_FORM: ProductForm = {
  name: "",
  priceDisplay: "",
  category: "",
  description: "",
  imageUrl: "",
  stock: "0",
  featured: false,
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: authed && !!actor && !isFetching,
  });

  const addMutation = useMutation({
    mutationFn: async (f: ProductForm) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProduct(
        f.name,
        BigInt(Math.round(Number.parseFloat(f.priceDisplay) * 100)),
        f.description,
        f.category,
        f.imageUrl,
        BigInt(Number.parseInt(f.stock, 10)),
        f.featured,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setFormOpen(false);
      toast.success("Product added!");
    },
    onError: () => toast.error("Failed to add product"),
  });

  const updateMutation = useMutation({
    mutationFn: async (f: ProductForm) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProduct(
        editTarget!.id,
        f.name,
        BigInt(Math.round(Number.parseFloat(f.priceDisplay) * 100)),
        f.description,
        f.category,
        f.imageUrl,
        BigInt(Number.parseInt(f.stock, 10)),
        f.featured,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setFormOpen(false);
      toast.success("Product updated!");
    },
    onError: () => toast.error("Failed to update product"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDeleteTarget(null);
      toast.success("Product removed");
    },
    onError: () => toast.error("Failed to remove product"),
  });

  function handleLogin() {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  }

  function openAdd() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  }

  function openEdit(product: Product) {
    setEditTarget(product);
    setForm({
      name: product.name,
      priceDisplay: (Number(product.priceCents) / 100).toFixed(2),
      category: product.category,
      description: product.description,
      imageUrl: product.imageUrl,
      stock: product.stock.toString(),
      featured: product.featured,
    });
    setFormOpen(true);
  }

  function handleFormSubmit() {
    if (!form.name || !form.priceDisplay || !form.category) {
      toast.error("Name, price, and category are required");
      return;
    }
    if (editTarget) {
      updateMutation.mutate(form);
    } else {
      addMutation.mutate(form);
    }
  }

  const isMutating = addMutation.isPending || updateMutation.isPending;

  // ── Login Gate ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        {/* Background grain */}
        <div
          className="fixed inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-sm"
        >
          {/* Glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 via-transparent to-transparent blur-xl" />

          <div className="relative border border-border/60 bg-card/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h1 className="font-display text-2xl tracking-[0.25em] text-foreground">
                ZEN ADMIN
              </h1>
              <p className="font-body text-xs text-muted-foreground tracking-widest">
                RESTRICTED ACCESS
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="font-body text-xs tracking-widest text-muted-foreground">
                  PASSWORD
                </Label>
                <Input
                  data-ocid="admin.login_input"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter admin password"
                  className="bg-background/50 border-border/60 focus:border-primary font-body"
                />
                {loginError && (
                  <p className="text-xs text-destructive font-body">
                    Invalid password. Try again.
                  </p>
                )}
              </div>

              <Button
                data-ocid="admin.login_button"
                onClick={handleLogin}
                className="w-full bg-primary hover:bg-primary/90 font-display tracking-widest"
              >
                ENTER
              </Button>
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.hash = "";
              }}
              className="mt-6 w-full text-center font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to store
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="font-display text-lg tracking-[0.3em] text-foreground">
              ZEN ADMIN
            </h1>
            <Badge
              variant="outline"
              className="text-primary border-primary/40 font-body text-xs"
            >
              Dashboard
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button
              data-ocid="admin.add_product_button"
              onClick={openAdd}
              size="sm"
              className="bg-primary hover:bg-primary/90 font-body gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
            <Button
              data-ocid="admin.logout_button"
              onClick={() => {
                setAuthed(false);
                window.location.hash = "";
              }}
              variant="outline"
              size="sm"
              className="border-border/60 font-body gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="font-display text-2xl tracking-widest">PRODUCTS</h2>
          <p className="font-body text-sm text-muted-foreground mt-1">
            {products.length} item{products.length !== 1 ? "s" : ""} in catalog
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground font-body py-16 justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading products…
          </div>
        ) : (
          <div className="border border-border/60 rounded-xl overflow-hidden">
            <Table data-ocid="admin.products_table">
              <TableHeader>
                <TableRow className="border-border/60 bg-card/50">
                  <TableHead className="font-body text-xs tracking-widest text-muted-foreground w-16">
                    IMG
                  </TableHead>
                  <TableHead className="font-body text-xs tracking-widest text-muted-foreground">
                    NAME
                  </TableHead>
                  <TableHead className="font-body text-xs tracking-widest text-muted-foreground">
                    CATEGORY
                  </TableHead>
                  <TableHead className="font-body text-xs tracking-widest text-muted-foreground">
                    PRICE
                  </TableHead>
                  <TableHead className="font-body text-xs tracking-widest text-muted-foreground">
                    STOCK
                  </TableHead>
                  <TableHead className="font-body text-xs tracking-widest text-muted-foreground">
                    FEATURED
                  </TableHead>
                  <TableHead className="font-body text-xs tracking-widest text-muted-foreground text-right">
                    ACTIONS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-16 text-muted-foreground font-body"
                      data-ocid="admin.products_table.empty_state"
                    >
                      No products yet. Add your first product.
                    </TableCell>
                  </TableRow>
                )}
                {products.map((product, idx) => (
                  <TableRow
                    key={product.id.toString()}
                    data-ocid={`admin.product.item.${idx + 1}`}
                    className="border-border/40 hover:bg-card/30 transition-colors"
                  >
                    <TableCell>
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-10 w-10 object-cover rounded-md border border-border/40"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-muted-foreground text-xs">
                          —
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-body font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-body text-xs">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-body">
                      ${(Number(product.priceCents) / 100).toFixed(2)}
                    </TableCell>
                    <TableCell className="font-body">
                      {product.stock.toString()}
                    </TableCell>
                    <TableCell>
                      {product.featured ? (
                        <Badge className="bg-primary/20 text-primary border border-primary/30 font-body text-xs">
                          Yes
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground font-body text-xs">
                          No
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          data-ocid={`admin.product.edit_button.${idx + 1}`}
                          onClick={() => openEdit(product)}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-border/60 hover:border-primary/60 hover:text-primary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          data-ocid={`admin.product.delete_button.${idx + 1}`}
                          onClick={() => setDeleteTarget(product)}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-border/60 hover:border-destructive/60 hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Add / Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent
          data-ocid="admin.product_form.dialog"
          className="bg-card border-border/60 max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="font-display tracking-widest">
              {editTarget ? "EDIT PRODUCT" : "ADD PRODUCT"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="font-body text-xs tracking-widest text-muted-foreground">
                NAME *
              </Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Dragon Ball Z Figure"
                className="bg-background/50 border-border/60 font-body"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="font-body text-xs tracking-widest text-muted-foreground">
                  PRICE (USD) *
                </Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.priceDisplay}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, priceDisplay: e.target.value }))
                  }
                  placeholder="29.99"
                  className="bg-background/50 border-border/60 font-body"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-xs tracking-widest text-muted-foreground">
                  STOCK
                </Label>
                <Input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, stock: e.target.value }))
                  }
                  placeholder="10"
                  className="bg-background/50 border-border/60 font-body"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="font-body text-xs tracking-widest text-muted-foreground">
                CATEGORY *
              </Label>
              <Input
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="e.g. Figures, Weapons, Manga…"
                className="bg-background/50 border-border/60 font-body"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="font-body text-xs tracking-widest text-muted-foreground">
                DESCRIPTION
              </Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Short product description…"
                rows={3}
                className="bg-background/50 border-border/60 font-body resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="font-body text-xs tracking-widest text-muted-foreground">
                IMAGE URL
              </Label>
              <Input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                placeholder="https://… or /assets/…"
                className="bg-background/50 border-border/60 font-body"
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="preview"
                  className="mt-2 h-20 w-20 object-cover rounded-md border border-border/40"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border/40 bg-background/30 px-4 py-3">
              <div>
                <p className="font-body text-sm text-foreground">
                  Featured product
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  Show on hero/featured section
                </p>
              </div>
              <Switch
                checked={form.featured}
                onCheckedChange={(checked) =>
                  setForm((f) => ({ ...f, featured: checked }))
                }
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              data-ocid="admin.product_form.cancel_button"
              variant="outline"
              onClick={() => setFormOpen(false)}
              className="border-border/60 font-body"
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.product_form.submit_button"
              onClick={handleFormSubmit}
              disabled={isMutating}
              className="bg-primary hover:bg-primary/90 font-body"
            >
              {isMutating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : editTarget ? (
                "Save Changes"
              ) : (
                "Add Product"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent
          data-ocid="admin.delete_confirm.dialog"
          className="bg-card border-border/60"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display tracking-widest">
              DELETE PRODUCT
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-muted-foreground">
              Are you sure you want to remove{" "}
              <span className="text-foreground font-medium">
                {deleteTarget?.name}
              </span>
              ? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="admin.delete_confirm.cancel_button"
              className="border-border/60 font-body"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.delete_confirm.confirm_button"
              onClick={() =>
                deleteTarget && deleteMutation.mutate(deleteTarget.id)
              }
              disabled={deleteMutation.isPending}
              className="bg-destructive hover:bg-destructive/90 font-body"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
