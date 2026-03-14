import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFeaturedProducts } from "@/hooks/useQueries";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Dragon Soul Hoodie",
    priceCents: 8999n,
    category: "Hoodies",
    description: "Embroidered red dragon, heavyweight fleece",
    imageUrl: "/assets/generated/zen-product-hoodie.dim_600x600.jpg",
    featured: true,
    stock: 15n,
  },
  {
    id: 2n,
    name: "Katana Strike Tee",
    priceCents: 4599n,
    category: "T-Shirts",
    description: "Kanji warrior graphic, 100% cotton",
    imageUrl: "/assets/generated/zen-product-tshirt.dim_600x600.jpg",
    featured: true,
    stock: 24n,
  },
  {
    id: 3n,
    name: "Shadow Warrior Joggers",
    priceCents: 6999n,
    category: "Bottoms",
    description: "Tapered fit, red stripe detail",
    imageUrl: "/assets/generated/zen-product-pants.dim_600x600.jpg",
    featured: true,
    stock: 18n,
  },
  {
    id: 4n,
    name: "Oni Mask Cap",
    priceCents: 3499n,
    category: "Accessories",
    description: "Embroidered demon mask, structured fit",
    imageUrl: "/assets/generated/zen-product-cap.dim_600x600.jpg",
    featured: true,
    stock: 30n,
  },
];

function formatPrice(cents: bigint): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
    toast.success(`${product.name} added to cart!`, {
      className: "bg-background border border-primary text-foreground",
    });
  };

  const ocidIndex = index + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="product-card group relative flex flex-col bg-card border border-border overflow-hidden"
      data-ocid={`products.item.${ocidIndex}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-zen-dark-2">
        <img
          src={
            product.imageUrl ||
            "/assets/generated/zen-product-hoodie.dim_600x600.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/generated/zen-product-hoodie.dim_600x600.jpg";
          }}
        />
        {product.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground font-display tracking-wider text-xs">
              <Star className="h-3 w-3 mr-1 fill-current" />
              FEATURED
            </Badge>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <div>
          <Badge
            variant="outline"
            className="text-xs font-display tracking-widest border-border text-muted-foreground mb-2"
          >
            {product.category}
          </Badge>
          <h3 className="font-display text-lg tracking-wider text-foreground leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span
            className="font-display text-xl tracking-wider"
            style={{ color: "oklch(0.60 0.25 27)" }}
          >
            {formatPrice(product.priceCents)}
          </span>
          <Button
            type="button"
            size="sm"
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0n}
            data-ocid={`products.add_button.${ocidIndex}`}
            className="font-display tracking-widest text-xs bg-primary hover:bg-zen-red-bright text-primary-foreground transition-all duration-200"
          >
            {adding ? (
              "ADDING..."
            ) : (
              <>
                <ShoppingCart className="h-3 w-3 mr-1" />
                ADD
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/0 group-hover:bg-primary transition-colors duration-300" />
    </motion.div>
  );
}

function ProductSkeleton({ idx }: { idx: number }) {
  return (
    <div
      className="bg-card border border-border overflow-hidden"
      data-ocid="products.loading_state"
      key={idx}
    >
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const { data: products, isLoading } = useGetFeaturedProducts();
  const displayProducts: Product[] =
    products && products.length > 0 ? products : FALLBACK_PRODUCTS;

  return (
    <section id="products" className="relative py-24 px-4 noise-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-japanese text-xs tracking-[0.4em] text-primary mb-3 uppercase">
            厳選コレクション
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-widest text-foreground mb-4">
            FEATURED
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-24 bg-border" />
            <span className="text-primary text-lg">✦</span>
            <div className="h-px flex-1 max-w-24 bg-border" />
          </div>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((idx) => (
              <ProductSkeleton key={idx} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayProducts.map((product, index) => (
              <ProductCard
                key={Number(product.id)}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="font-display tracking-widest border-primary text-primary hover:bg-primary/10 px-12"
            data-ocid="products.primary_button"
          >
            VIEW ALL PRODUCTS
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
