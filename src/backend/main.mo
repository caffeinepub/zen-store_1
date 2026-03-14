import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  type Product = {
    id : Nat;
    name : Text;
    priceCents : Nat;
    description : Text;
    category : Text;
    imageUrl : Text;
    stock : Nat;
    featured : Bool;
  };

  let products = Map.empty<Nat, Product>();
  var nextProductId = 1;

  let categories = Map.empty<Text, Bool>();

  public shared ({ caller }) func addProduct(name : Text, priceCents : Nat, description : Text, category : Text, imageUrl : Text, stock : Nat, featured : Bool) : async Nat {
    let productId = nextProductId;
    let product : Product = {
      id = productId;
      name;
      priceCents;
      description;
      category;
      imageUrl;
      stock;
      featured;
    };

    products.add(productId, product);
    categories.add(category, true);

    nextProductId += 1;
    productId;
  };

  public shared ({ caller }) func updateProduct(productId : Nat, name : Text, priceCents : Nat, description : Text, category : Text, imageUrl : Text, stock : Nat, featured : Bool) : async () {
    if (not products.containsKey(productId)) {
      Runtime.trap("Product does not exist");
    };

    let product : Product = {
      id = productId;
      name;
      priceCents;
      description;
      category;
      imageUrl;
      stock;
      featured;
    };

    products.add(productId, product);
    categories.add(category, true);
  };

  public shared ({ caller }) func removeProduct(productId : Nat) : async () {
    if (not products.containsKey(productId)) {
      Runtime.trap("Product does not exist");
    };
    products.remove(productId);
  };

  public query ({ caller }) func getProduct(productId : Nat) : async Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filtered = Map.empty<Nat, Product>();
    for (id in products.keys()) {
      let product = switch (products.get(id)) {
        case (null) { Runtime.trap("Could not find product") };
        case (?product) { product };
      };
      if (Text.equal(product.category, category)) {
        filtered.add(id, product);
      };
    };
    filtered.values().toArray();
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    let filtered = Map.empty<Nat, Product>();
    for (id in products.keys()) {
      let product = switch (products.get(id)) {
        case (null) { Runtime.trap("Could not find product") };
        case (?product) { product };
      };
      if (product.featured) {
        filtered.add(id, product);
      };
    };
    filtered.values().toArray();
  };

  public query ({ caller }) func getAllCategories() : async [Text] {
    categories.keys().toArray();
  };

  public shared ({ caller }) func addSampleProducts() : async () {
    let sampleProducts : [Product] = [
      {
        id = 0;
        name = "Naruto Hoodie";
        priceCents = 2999;
        description = "Comfortable orange hoodie inspired by Naruto.";
        category = "Streetwear";
        imageUrl = "https://example.com/naruto-hoodie.jpg";
        stock = 50;
        featured = true;
      },
      {
        id = 0;
        name = "Attack on Titan T-shirt";
        priceCents = 1999;
        description = "Stylish t-shirt featuring the Survey Corps logo.";
        category = "Anime";
        imageUrl = "https://example.com/aot-tshirt.jpg";
        stock = 100;
        featured = false;
      },
      {
        id = 0;
        name = "Demon Slayer Sword Replica";
        priceCents = 4999;
        description = "High-quality replica of Tanjiro's sword.";
        category = "Merchandise";
        imageUrl = "https://example.com/demon-slayer-sword.jpg";
        stock = 10;
        featured = true;
      },
      {
        id = 0;
        name = "Sailor Moon Backpack";
        priceCents = 2499;
        description = "Cute backpack with Sailor Moon design.";
        category = "Accessories";
        imageUrl = "https://example.com/sailor-moon-backpack.jpg";
        stock = 30;
        featured = false;
      },
    ];

    for (product in sampleProducts.values()) {
      let updatedProduct : Product = {
        id = nextProductId;
        name = product.name;
        priceCents = product.priceCents;
        description = product.description;
        category = product.category;
        imageUrl = product.imageUrl;
        stock = product.stock;
        featured = product.featured;
      };
      products.add(nextProductId, updatedProduct);
      categories.add(product.category, true);
      nextProductId += 1;
    };
  };
};
