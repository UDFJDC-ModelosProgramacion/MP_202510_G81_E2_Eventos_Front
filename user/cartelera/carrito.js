
    function cart() {
      return {
        cartItems: [
  {
    name: "Concierto Karol G",
    model: "Palco Norte",
    hsCode: "EVT001",
    quantity: 2,
    weight: 0.1,
    perPieceRate: 350.00,
    totalPrice: 700.00,
    color: "Red",
    deliveryMethod: "Correo electrónico",
    description: "Entradas para el concierto de Karol G en zona Palco Norte, excelente visibilidad.",
    isEditingDescription: false,
    originalDescription: "",
    showDescription: false,
    image: "../../resources/images/events/1.jpg"
  },
  {
    name: "Festival Estéreo Picnic",
    model: "Zona General - Día 1",
    hsCode: "EVT002",
    quantity: 1,
    weight: 0.1,
    perPieceRate: 200.00,
    totalPrice: 200.00,
    color: "Black",
    deliveryMethod: "Taquilla",
    description: "Acceso general para el primer día del Festival Estéreo Picnic.",
    isEditingDescription: false,
    originalDescription: "",
    showDescription: false,
    image: "../../resources/images/events/2.jpg"
  },
  {
    name: "Shakira World Tour",
    model: "VIP Central",
    hsCode: "EVT003",
    quantity: 1,
    weight: 0.1,
    perPieceRate: 500.00,
    totalPrice: 500.00,
    color: "Blue",
    deliveryMethod: "Entrega rápida",
    description: "Entrada VIP central con acceso preferencial al show de Shakira.",
    isEditingDescription: false,
    originalDescription: "",
    showDescription: false,
    image: "../../resources/images/events/3.jpg"
  }


        ],
        shippingMethod: "standard",
        promoCode: "",
        promoMessage: "",
        promoValid: false,
        discount: 0,
        
        removeItem(index) {
          if (confirm('Are you sure you want to remove this item?')) {
            this.cartItems.splice(index, 1);
          }
        },
        
        clearCart() {
          if (confirm('Are you sure you want to clear your cart?')) {
            this.cartItems = [];
          }
        },
        
        incrementQuantity(index) {
          this.cartItems[index].quantity++;
          this.updateTotalPrice(index);
        },
        
        decrementQuantity(index) {
          if (this.cartItems[index].quantity > 1) {
            this.cartItems[index].quantity--;
            this.updateTotalPrice(index);
          }
        },
        
        updateTotalPrice(index) {
          const item = this.cartItems[index];
          item.totalPrice = item.perPieceRate * item.quantity;
        },
        
        toggleDescription(index) {
          this.cartItems[index].showDescription = !this.cartItems[index].showDescription;
        },
        
        startEditingDescription(index) {
          this.cartItems[index].originalDescription = this.cartItems[index].description;
          this.cartItems[index].isEditingDescription = true;
        },
        
        saveDescription(index) {
          this.cartItems[index].isEditingDescription = false;
          // Here you could add code to save to backend if needed
          console.log(`Description updated for ${this.cartItems[index].name}`);
        },
        
        cancelEditingDescription(index) {
          this.cartItems[index].description = this.cartItems[index].originalDescription;
          this.cartItems[index].isEditingDescription = false;
        },
        
        getColorHex(color) {
          const colorMap = {
            'Black': '#000000',
            'Silver': '#C0C0C0',
            'Blue': '#0047AB',
            'Red': '#FF0000',
            'White': '#FFFFFF'
          };
          return colorMap[color] || '#000000';
        },
        
        applyPromoCode() {
          // Example promo codes
          const promoCodes = {
            'SAVE10': { discount: 0.1, message: '10% discount applied!' },
            'FREESHIP': { discount: 0, message: 'Free shipping applied!', freeShipping: true },
            'WELCOME20': { discount: 0.2, message: '20% discount applied!' }
          };
          
          if (this.promoCode.trim() === '') {
            this.promoMessage = 'Please enter a promo code';
            this.promoValid = false;
            return;
          }
          
          const promo = promoCodes[this.promoCode.toUpperCase()];
          if (promo) {
            this.promoValid = true;
            this.promoMessage = promo.message;
            
            if (promo.discount) {
              this.discount = this.subtotal * promo.discount;
            }
            
            if (promo.freeShipping) {
              this.shippingMethod = 'standard';
              this.shipping = 0;
            }
          } else {
            this.promoValid = false;
            this.promoMessage = 'Invalid promo code';
            this.discount = 0;
          }
        },
        
        calculateTax() {
          // Example tax calculation (7.5%)
          return (this.subtotal - this.discount) * 0.075;
        },
        
        get subtotal() {
          return this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        },
        
        get shippingCost() {
          const shippingRates = {
            'standard': 5,
            'express': 15,
            'overnight': 25
          };
          return shippingRates[this.shippingMethod] || 5;
        },
        
        get total() {
          return this.subtotal + this.shippingCost + this.calculateTax() - this.discount;
        }
      };
    }
