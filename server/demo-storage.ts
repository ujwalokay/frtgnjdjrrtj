import { 
  type Booking, 
  type InsertBooking, 
  type DeviceConfig,
  type InsertDeviceConfig,
  type PricingConfig,
  type InsertPricingConfig,
  type HappyHoursConfig,
  type InsertHappyHoursConfig,
  type HappyHoursPricing,
  type InsertHappyHoursPricing,
  type FoodItem,
  type InsertFoodItem,
  type StockBatch,
  type InsertStockBatch,
  type BookingHistory,
  type InsertBookingHistory,
  type User,
  type InsertUser,
  type UpsertUser,
  type Expense,
  type InsertExpense,
  type ActivityLog,
  type InsertActivityLog,
  type Notification,
  type InsertNotification,
  type GamingCenterInfo,
  type InsertGamingCenterInfo,
  type GalleryImage,
  type InsertGalleryImage,
  type Facility,
  type InsertFacility,
  type Game,
  type InsertGame,
  type LoadMetric,
  type InsertLoadMetric,
  type LoadPrediction,
  type InsertLoadPrediction,
  type RetentionConfig,
  type InsertRetentionConfig,
  type DeviceMaintenance,
  type InsertDeviceMaintenance,
  type PaymentLog,
  type InsertPaymentLog,
} from "@shared/schema";
import { 
  type IStorage, 
  type BookingStats, 
  type BookingHistoryItem,
  type CustomerPromotionSummary,
  type PromotionHistoryItem,
  type RetentionMetrics
} from "./storage";

export class DemoStorage implements IStorage {
  private bookings: Map<string, Booking> = new Map();
  private deviceConfigs: Map<string, DeviceConfig> = new Map();
  private pricingConfigs: PricingConfig[] = [];
  private happyHoursConfigs: HappyHoursConfig[] = [];
  private happyHoursPricing: HappyHoursPricing[] = [];
  private foodItems: Map<string, FoodItem> = new Map();
  private stockBatches: StockBatch[] = [];
  private bookingHistoryData: BookingHistory[] = [];
  private users: Map<string, User> = new Map();
  private expenses: Map<string, Expense> = new Map();
  private activityLogs: ActivityLog[] = [];
  private notifications: Map<string, Notification> = new Map();
  private gamingCenterInfoData: GamingCenterInfo | null = null;
  private galleryImages: Map<string, GalleryImage> = new Map();
  private facilities: Map<string, Facility> = new Map();
  private games: Map<string, Game> = new Map();
  private loadMetricsData: LoadMetric[] = [];
  private loadPredictionsData: LoadPrediction[] = [];
  private retentionConfigData: RetentionConfig | null = null;
  private deviceMaintenanceData: Map<string, DeviceMaintenance> = new Map();
  private paymentLogsData: PaymentLog[] = [];

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Device configs - Gaming stations
    const deviceConfigsData: DeviceConfig[] = [
      {
        id: crypto.randomUUID(),
        category: "PC",
        count: 10,
        seats: ["PC-1", "PC-2", "PC-3", "PC-4", "PC-5", "PC-6", "PC-7", "PC-8", "PC-9", "PC-10"]
      },
      {
        id: crypto.randomUUID(),
        category: "PS5",
        count: 5,
        seats: ["PS5-1", "PS5-2", "PS5-3", "PS5-4", "PS5-5"]
      },
      {
        id: crypto.randomUUID(),
        category: "VR",
        count: 2,
        seats: ["VR-1", "VR-2"]
      },
      {
        id: crypto.randomUUID(),
        category: "Racing Sim",
        count: 3,
        seats: ["Racing-1", "Racing-2", "Racing-3"]
      }
    ];
    deviceConfigsData.forEach(config => this.deviceConfigs.set(config.category, config));

    // Pricing configs
    this.pricingConfigs = [
      // PC Pricing
      { id: crypto.randomUUID(), category: "PC", duration: "30 mins", price: "50", personCount: 1 },
      { id: crypto.randomUUID(), category: "PC", duration: "1 hour", price: "90", personCount: 1 },
      { id: crypto.randomUUID(), category: "PC", duration: "2 hours", price: "170", personCount: 1 },
      { id: crypto.randomUUID(), category: "PC", duration: "4 hours", price: "320", personCount: 1 },
      // PS5 Pricing
      { id: crypto.randomUUID(), category: "PS5", duration: "30 mins", price: "70", personCount: 1 },
      { id: crypto.randomUUID(), category: "PS5", duration: "1 hour", price: "130", personCount: 1 },
      { id: crypto.randomUUID(), category: "PS5", duration: "2 hours", price: "240", personCount: 1 },
      { id: crypto.randomUUID(), category: "PS5", duration: "1 hour", price: "200", personCount: 2 },
      // VR Pricing
      { id: crypto.randomUUID(), category: "VR", duration: "30 mins", price: "150", personCount: 1 },
      { id: crypto.randomUUID(), category: "VR", duration: "1 hour", price: "280", personCount: 1 },
      // Racing Sim Pricing
      { id: crypto.randomUUID(), category: "Racing Sim", duration: "30 mins", price: "100", personCount: 1 },
      { id: crypto.randomUUID(), category: "Racing Sim", duration: "1 hour", price: "180", personCount: 1 },
    ];

    // Happy hours config
    this.happyHoursConfigs = [
      { id: crypto.randomUUID(), category: "PC", startTime: "14:00", endTime: "17:00", enabled: 1 },
      { id: crypto.randomUUID(), category: "PS5", startTime: "14:00", endTime: "17:00", enabled: 1 },
    ];

    // Happy hours pricing (20% discount during happy hours)
    this.happyHoursPricing = [
      { id: crypto.randomUUID(), category: "PC", duration: "1 hour", price: "72", personCount: 1 },
      { id: crypto.randomUUID(), category: "PC", duration: "2 hours", price: "136", personCount: 1 },
      { id: crypto.randomUUID(), category: "PS5", duration: "1 hour", price: "104", personCount: 1 },
      { id: crypto.randomUUID(), category: "PS5", duration: "2 hours", price: "192", personCount: 1 },
    ];

    // Food items
    const foodItemsData: FoodItem[] = [
      { id: crypto.randomUUID(), name: "Chicken Burger", price: "120", costPrice: "60", currentStock: 45, minStockLevel: 20, inInventory: 1, category: "trackable", supplier: "Food Suppliers Co.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Veg Burger", price: "100", costPrice: "50", currentStock: 38, minStockLevel: 20, inInventory: 1, category: "trackable", supplier: "Food Suppliers Co.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Fries (Large)", price: "80", costPrice: "30", currentStock: 52, minStockLevel: 25, inInventory: 1, category: "trackable", supplier: "Food Suppliers Co.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Coke (330ml)", price: "40", costPrice: "20", currentStock: 85, minStockLevel: 40, inInventory: 1, category: "trackable", supplier: "Beverage Dist. Ltd.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Pepsi (330ml)", price: "40", costPrice: "20", currentStock: 72, minStockLevel: 40, inInventory: 1, category: "trackable", supplier: "Beverage Dist. Ltd.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Red Bull", price: "120", costPrice: "70", currentStock: 35, minStockLevel: 20, inInventory: 1, category: "trackable", supplier: "Beverage Dist. Ltd.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Water Bottle", price: "20", costPrice: "10", currentStock: 140, minStockLevel: 50, inInventory: 1, category: "trackable", supplier: "Beverage Dist. Ltd.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Sandwich", price: "90", costPrice: "45", currentStock: 28, minStockLevel: 15, inInventory: 1, category: "trackable", supplier: "Food Suppliers Co.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Pizza (Personal)", price: "180", costPrice: "90", currentStock: 15, minStockLevel: 10, inInventory: 1, category: "trackable", supplier: "Food Suppliers Co.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Nachos", price: "110", costPrice: "50", currentStock: 30, minStockLevel: 15, inInventory: 1, category: "trackable", supplier: "Food Suppliers Co.", expiryDate: null },
      { id: crypto.randomUUID(), name: "Coffee", price: "60", costPrice: "25", currentStock: 0, minStockLevel: 30, inInventory: 0, category: "non-trackable", supplier: null, expiryDate: null },
      { id: crypto.randomUUID(), name: "Tea", price: "40", costPrice: "15", currentStock: 0, minStockLevel: 30, inInventory: 0, category: "non-trackable", supplier: null, expiryDate: null },
    ];
    foodItemsData.forEach(item => this.foodItems.set(item.id, item));

    // Active bookings
    const bookingsData: Booking[] = [
      {
        id: crypto.randomUUID(),
        category: "PC",
        seatNumber: 1,
        seatName: "PC-1",
        customerName: "Rahul Sharma",
        whatsappNumber: "+919876543210",
        startTime: new Date(now.getTime() - 45 * 60 * 1000), // Started 45 mins ago
        endTime: new Date(now.getTime() + 75 * 60 * 1000), // Ends in 75 mins (2 hour booking)
        price: "170",
        status: "active",
        bookingType: ["Walk-in"],
        pausedRemainingTime: null,
        personCount: 1,
        paymentMethod: null,
        cashAmount: null,
        upiAmount: null,
        paymentStatus: "unpaid",
        lastPaymentAction: null,
        foodOrders: [
          { foodId: foodItemsData[0].id, foodName: "Chicken Burger", price: "120", quantity: 1 },
          { foodId: foodItemsData[3].id, foodName: "Coke (330ml)", price: "40", quantity: 1 }
        ],
        originalPrice: null,
        discountApplied: null,
        bonusHoursApplied: null,
        promotionDetails: null,
        isPromotionalDiscount: 0,
        isPromotionalBonus: 0,
        manualDiscountPercentage: null,
        manualFreeHours: null,
        discount: null,
        bonus: null,
        createdAt: new Date(now.getTime() - 45 * 60 * 1000)
      },
      {
        id: crypto.randomUUID(),
        category: "PS5",
        seatNumber: 2,
        seatName: "PS5-2",
        customerName: "Priya Patel",
        whatsappNumber: "+919765432109",
        startTime: new Date(now.getTime() - 20 * 60 * 1000), // Started 20 mins ago
        endTime: new Date(now.getTime() + 40 * 60 * 1000), // Ends in 40 mins
        price: "130",
        status: "active",
        bookingType: ["Walk-in"],
        pausedRemainingTime: null,
        personCount: 1,
        paymentMethod: null,
        cashAmount: null,
        upiAmount: null,
        paymentStatus: "unpaid",
        lastPaymentAction: null,
        foodOrders: [],
        originalPrice: null,
        discountApplied: null,
        bonusHoursApplied: null,
        promotionDetails: null,
        isPromotionalDiscount: 0,
        isPromotionalBonus: 0,
        manualDiscountPercentage: null,
        manualFreeHours: null,
        discount: null,
        bonus: null,
        createdAt: new Date(now.getTime() - 20 * 60 * 1000)
      },
      {
        id: crypto.randomUUID(),
        category: "VR",
        seatNumber: 1,
        seatName: "VR-1",
        customerName: "Amit Kumar",
        whatsappNumber: "+919654321098",
        startTime: new Date(now.getTime() - 10 * 60 * 1000), // Started 10 mins ago
        endTime: new Date(now.getTime() + 20 * 60 * 1000), // Ends in 20 mins
        price: "150",
        status: "active",
        bookingType: ["Walk-in"],
        pausedRemainingTime: null,
        personCount: 1,
        paymentMethod: null,
        cashAmount: null,
        upiAmount: null,
        paymentStatus: "unpaid",
        lastPaymentAction: null,
        foodOrders: [
          { foodId: foodItemsData[5].id, foodName: "Red Bull", price: "120", quantity: 1 }
        ],
        originalPrice: null,
        discountApplied: null,
        bonusHoursApplied: null,
        promotionDetails: null,
        isPromotionalDiscount: 0,
        isPromotionalBonus: 0,
        manualDiscountPercentage: null,
        manualFreeHours: null,
        discount: null,
        bonus: null,
        createdAt: new Date(now.getTime() - 10 * 60 * 1000)
      }
    ];
    bookingsData.forEach(booking => this.bookings.set(booking.id, booking));

    // Booking history (completed sessions)
    this.bookingHistoryData = [
      {
        id: crypto.randomUUID(),
        bookingId: crypto.randomUUID(),
        category: "PC",
        seatNumber: 3,
        seatName: "PC-3",
        customerName: "Sanjay Verma",
        whatsappNumber: "+919543210987",
        startTime: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000),
        endTime: new Date(yesterday.getTime() + 18 * 60 * 60 * 1000),
        price: "320",
        status: "completed",
        bookingType: ["Walk-in"],
        pausedRemainingTime: null,
        personCount: 1,
        paymentMethod: "upi_online",
        cashAmount: null,
        upiAmount: null,
        paymentStatus: "paid",
        lastPaymentAction: null,
        foodOrders: [
          { foodId: foodItemsData[8].id, foodName: "Pizza (Personal)", price: "180", quantity: 1 },
          { foodId: foodItemsData[3].id, foodName: "Coke (330ml)", price: "40", quantity: 2 }
        ],
        originalPrice: null,
        discountApplied: null,
        bonusHoursApplied: null,
        promotionDetails: null,
        isPromotionalDiscount: 0,
        isPromotionalBonus: 0,
        manualDiscountPercentage: null,
        manualFreeHours: null,
        discount: null,
        bonus: null,
        createdAt: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000),
        archivedAt: new Date(yesterday.getTime() + 18 * 60 * 60 * 1000)
      },
      {
        id: crypto.randomUUID(),
        bookingId: crypto.randomUUID(),
        category: "PS5",
        seatNumber: 1,
        seatName: "PS5-1",
        customerName: "Neha Singh",
        whatsappNumber: "+919432109876",
        startTime: new Date(twoDaysAgo.getTime() + 16 * 60 * 60 * 1000),
        endTime: new Date(twoDaysAgo.getTime() + 18 * 60 * 60 * 1000),
        price: "240",
        status: "completed",
        bookingType: ["Walk-in"],
        pausedRemainingTime: null,
        personCount: 1,
        paymentMethod: "cash",
        cashAmount: null,
        upiAmount: null,
        paymentStatus: "paid",
        lastPaymentAction: null,
        foodOrders: [],
        originalPrice: null,
        discountApplied: null,
        bonusHoursApplied: null,
        promotionDetails: null,
        isPromotionalDiscount: 0,
        isPromotionalBonus: 0,
        manualDiscountPercentage: null,
        manualFreeHours: null,
        discount: null,
        bonus: null,
        createdAt: new Date(twoDaysAgo.getTime() + 16 * 60 * 60 * 1000),
        archivedAt: new Date(twoDaysAgo.getTime() + 18 * 60 * 60 * 1000)
      }
    ];

    // Demo user
    this.users.set("demo", {
      id: "demo-user-id",
      email: "demo@airavotogaming.com",
      firstName: "Demo",
      lastName: "User",
      profileImageUrl: null,
      username: "demo",
      passwordHash: null,
      role: "staff",
      onboardingCompleted: 1,
      createdAt: now,
      updatedAt: now
    });

    // Gaming Center Info
    this.gamingCenterInfoData = {
      id: crypto.randomUUID(),
      name: "Airavoto Gaming Lounge",
      description: "India's First Gaming Lounge Management POS - Experience premium gaming with cutting-edge technology",
      address: "123 MG Road, Bangalore, Karnataka 560001",
      phone: "+91 80 1234 5678",
      email: "contact@airavotogaming.com",
      hours: "10:00 AM - 12:00 AM (Mon-Sun)",
      timezone: "Asia/Kolkata",
      updatedAt: now
    };

    // Sample expenses
    const expensesData: Expense[] = [
      {
        id: crypto.randomUUID(),
        category: "Rent",
        description: "Monthly rent for gaming lounge",
        amount: "50000",
        date: new Date(now.getFullYear(), now.getMonth(), 1),
        createdAt: new Date(now.getFullYear(), now.getMonth(), 1)
      },
      {
        id: crypto.randomUUID(),
        category: "Utilities",
        description: "Electricity bill",
        amount: "15000",
        date: new Date(now.getFullYear(), now.getMonth(), 5),
        createdAt: new Date(now.getFullYear(), now.getMonth(), 5)
      },
      {
        id: crypto.randomUUID(),
        category: "Food & Beverages",
        description: "Food stock purchase",
        amount: "8500",
        date: oneWeekAgo,
        createdAt: oneWeekAgo
      }
    ];
    expensesData.forEach(expense => this.expenses.set(expense.id, expense));

    // Retention config
    this.retentionConfigData = {
      id: crypto.randomUUID(),
      bookingHistoryDays: 36500,
      activityLogsDays: 36500,
      loadMetricsDays: 36500,
      loadPredictionsDays: 36500,
      expensesDays: 36500,
      updatedAt: now
    };

    // Facilities
    const facilitiesData: Facility[] = [
      { id: crypto.randomUUID(), name: "High-Speed WiFi", description: "Gigabit internet for lag-free gaming", icon: "Wifi" },
      { id: crypto.randomUUID(), name: "Air Conditioning", description: "Climate-controlled environment", icon: "Wind" },
      { id: crypto.randomUUID(), name: "Premium Seating", description: "Ergonomic gaming chairs", icon: "Armchair" },
      { id: crypto.randomUUID(), name: "Snack Bar", description: "Food and beverages available", icon: "UtensilsCrossed" },
    ];
    facilitiesData.forEach(facility => this.facilities.set(facility.id, facility));

    // Games
    const gamesData: Game[] = [
      { id: crypto.randomUUID(), name: "Valorant", description: "Tactical FPS shooter", imageUrl: null, category: "PC" },
      { id: crypto.randomUUID(), name: "FC 24", description: "FIFA Soccer", imageUrl: null, category: "PS5" },
      { id: crypto.randomUUID(), name: "GTA V", description: "Open world action-adventure", imageUrl: null, category: "PC" },
      { id: crypto.randomUUID(), name: "Call of Duty", description: "First-person shooter", imageUrl: null, category: "PC" },
      { id: crypto.randomUUID(), name: "Spider-Man", description: "Action-adventure superhero game", imageUrl: null, category: "PS5" },
      { id: crypto.randomUUID(), name: "Beat Saber", description: "VR rhythm game", imageUrl: null, category: "VR" },
    ];
    gamesData.forEach(game => this.games.set(game.id, game));
  }

  // Implement all IStorage methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByIds(ids: string[]): Promise<Booking[]> {
    return ids.map(id => this.bookings.get(id)).filter((b): b is Booking => b !== undefined);
  }

  async getActiveBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = crypto.randomUUID();
    const newBooking: Booking = {
      id,
      ...booking,
      startTime: typeof booking.startTime === 'string' ? new Date(booking.startTime) : booking.startTime,
      endTime: typeof booking.endTime === 'string' ? new Date(booking.endTime) : booking.endTime,
      createdAt: new Date()
    } as Booking;
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async updateBooking(id: string, data: Partial<InsertBooking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updated = { 
      ...booking, 
      ...data,
      startTime: data.startTime ? (typeof data.startTime === 'string' ? new Date(data.startTime) : data.startTime) : booking.startTime,
      endTime: data.endTime ? (typeof data.endTime === 'string' ? new Date(data.endTime) : data.endTime) : booking.endTime,
    };
    this.bookings.set(id, updated);
    return updated;
  }

  async deleteBooking(id: string): Promise<boolean> {
    return this.bookings.delete(id);
  }

  async getBookingStats(startDate: Date, endDate: Date): Promise<BookingStats> {
    const relevantBookings = this.bookingHistoryData.filter(
      b => b.startTime >= startDate && b.startTime <= endDate
    );

    const totalRevenue = relevantBookings.reduce((sum, b) => sum + parseFloat(b.price), 0);
    const totalFoodRevenue = relevantBookings.reduce((sum, b) => {
      if (b.foodOrders && b.foodOrders.length > 0) {
        return sum + b.foodOrders.reduce((foodSum, order) => 
          foodSum + parseFloat(order.price) * order.quantity, 0
        );
      }
      return sum;
    }, 0);

    const totalSessions = relevantBookings.length;
    const totalMinutes = relevantBookings.reduce((sum, b) => {
      const duration = b.endTime.getTime() - b.startTime.getTime();
      return sum + (duration / 1000 / 60);
    }, 0);
    const avgSessionMinutes = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

    const cashRevenue = relevantBookings
      .filter(b => b.paymentMethod === "cash")
      .reduce((sum, b) => sum + parseFloat(b.price), 0);

    const upiRevenue = relevantBookings
      .filter(b => b.paymentMethod === "upi_online")
      .reduce((sum, b) => sum + parseFloat(b.price), 0);

    return {
      totalRevenue,
      totalFoodRevenue,
      totalSessions,
      avgSessionMinutes,
      cashRevenue,
      upiRevenue
    };
  }

  async getBookingHistory(startDate: Date, endDate: Date): Promise<BookingHistoryItem[]> {
    const relevantBookings = this.bookingHistoryData.filter(
      b => b.startTime >= startDate && b.startTime <= endDate
    );

    return relevantBookings.map(booking => {
      const durationMs = booking.endTime.getTime() - booking.startTime.getTime();
      const durationMinutes = Math.round(durationMs / 1000 / 60);
      const hours = Math.floor(durationMinutes / 60);
      const mins = durationMinutes % 60;
      
      let duration: string;
      if (hours > 0 && mins > 0) {
        duration = `${hours} hour${hours > 1 ? 's' : ''} ${mins} mins`;
      } else if (hours > 0) {
        duration = `${hours} hour${hours > 1 ? 's' : ''}`;
      } else {
        duration = `${mins} mins`;
      }

      const foodAmount = booking.foodOrders && booking.foodOrders.length > 0
        ? booking.foodOrders.reduce((sum, order) => sum + parseFloat(order.price) * order.quantity, 0)
        : 0;

      const totalAmount = parseFloat(booking.price) + foodAmount;

      return {
        id: booking.id,
        date: booking.startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        seatName: booking.seatName,
        customerName: booking.customerName,
        duration,
        durationMinutes,
        price: booking.price,
        foodAmount,
        totalAmount,
        paymentMethod: booking.paymentMethod,
        paymentStatus: booking.paymentStatus,
        cashAmount: booking.cashAmount,
        upiAmount: booking.upiAmount,
        discount: booking.discount,
        bonus: booking.bonus,
        discountApplied: booking.discountApplied,
        bonusHoursApplied: booking.bonusHoursApplied
      };
    });
  }

  async getCustomerPromotionSummary(whatsappNumber: string): Promise<CustomerPromotionSummary> {
    return {
      discountCount: 0,
      bonusCount: 0,
      totalSavings: 0,
      totalBonusHours: 0
    };
  }

  async getPromotionHistoryByCustomer(whatsappNumber: string): Promise<PromotionHistoryItem[]> {
    return [];
  }

  async getRetentionMetrics(startDate: Date, endDate: Date, period: 'daily' | 'weekly' | 'monthly'): Promise<RetentionMetrics> {
    return {
      summary: {
        totalCustomers: 15,
        newCustomers: 5,
        returningCustomers: 10,
        retentionRate: 66.7,
        churnRate: 33.3,
        avgVisitFrequency: 2.5,
        avgLifetimeValue: 850
      },
      series: []
    };
  }

  async moveBookingsToHistory(): Promise<number> {
    return 0;
  }

  async getAllBookingHistory(): Promise<BookingHistory[]> {
    return this.bookingHistoryData;
  }

  async getAllDeviceConfigs(): Promise<DeviceConfig[]> {
    return Array.from(this.deviceConfigs.values());
  }

  async getDeviceConfig(category: string): Promise<DeviceConfig | undefined> {
    return this.deviceConfigs.get(category);
  }

  async upsertDeviceConfig(config: InsertDeviceConfig): Promise<DeviceConfig> {
    const existing = this.deviceConfigs.get(config.category);
    const newConfig: DeviceConfig = {
      id: existing?.id || crypto.randomUUID(),
      ...config
    };
    this.deviceConfigs.set(config.category, newConfig);
    return newConfig;
  }

  async deleteDeviceConfig(category: string): Promise<boolean> {
    return this.deviceConfigs.delete(category);
  }

  async getAllPricingConfigs(): Promise<PricingConfig[]> {
    return this.pricingConfigs;
  }

  async getPricingConfigsByCategory(category: string): Promise<PricingConfig[]> {
    return this.pricingConfigs.filter(p => p.category === category);
  }

  async upsertPricingConfigs(category: string, configs: InsertPricingConfig[]): Promise<PricingConfig[]> {
    this.pricingConfigs = this.pricingConfigs.filter(p => p.category !== category);
    const newConfigs = configs.map(c => ({ id: crypto.randomUUID(), ...c }));
    this.pricingConfigs.push(...newConfigs);
    return newConfigs;
  }

  async deletePricingConfig(category: string): Promise<boolean> {
    const lengthBefore = this.pricingConfigs.length;
    this.pricingConfigs = this.pricingConfigs.filter(p => p.category !== category);
    return this.pricingConfigs.length < lengthBefore;
  }

  async getAllHappyHoursConfigs(): Promise<HappyHoursConfig[]> {
    return this.happyHoursConfigs;
  }

  async getHappyHoursConfigsByCategory(category: string): Promise<HappyHoursConfig[]> {
    return this.happyHoursConfigs.filter(h => h.category === category);
  }

  async upsertHappyHoursConfigs(category: string, configs: InsertHappyHoursConfig[]): Promise<HappyHoursConfig[]> {
    this.happyHoursConfigs = this.happyHoursConfigs.filter(h => h.category !== category);
    const newConfigs = configs.map(c => ({ id: crypto.randomUUID(), ...c }));
    this.happyHoursConfigs.push(...newConfigs);
    return newConfigs;
  }

  async deleteHappyHoursConfig(category: string): Promise<boolean> {
    const lengthBefore = this.happyHoursConfigs.length;
    this.happyHoursConfigs = this.happyHoursConfigs.filter(h => h.category !== category);
    return this.happyHoursConfigs.length < lengthBefore;
  }

  async isHappyHoursActive(category: string): Promise<boolean> {
    const config = this.happyHoursConfigs.find(h => h.category === category && h.enabled === 1);
    if (!config) return false;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return currentTime >= config.startTime && currentTime <= config.endTime;
  }

  async getAllHappyHoursPricing(): Promise<HappyHoursPricing[]> {
    return this.happyHoursPricing;
  }

  async getHappyHoursPricingByCategory(category: string): Promise<HappyHoursPricing[]> {
    return this.happyHoursPricing.filter(p => p.category === category);
  }

  async upsertHappyHoursPricing(category: string, configs: InsertHappyHoursPricing[]): Promise<HappyHoursPricing[]> {
    this.happyHoursPricing = this.happyHoursPricing.filter(p => p.category !== category);
    const newConfigs = configs.map(c => ({ id: crypto.randomUUID(), ...c }));
    this.happyHoursPricing.push(...newConfigs);
    return newConfigs;
  }

  async deleteHappyHoursPricing(category: string): Promise<boolean> {
    const lengthBefore = this.happyHoursPricing.length;
    this.happyHoursPricing = this.happyHoursPricing.filter(p => p.category !== category);
    return this.happyHoursPricing.length < lengthBefore;
  }

  async getAllFoodItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values());
  }

  async getFoodItem(id: string): Promise<FoodItem | undefined> {
    return this.foodItems.get(id);
  }

  async createFoodItem(item: InsertFoodItem): Promise<FoodItem> {
    const id = crypto.randomUUID();
    const newItem: FoodItem = { id, ...item } as FoodItem;
    this.foodItems.set(id, newItem);
    return newItem;
  }

  async updateFoodItem(id: string, item: InsertFoodItem): Promise<FoodItem | undefined> {
    const existing = this.foodItems.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...item };
    this.foodItems.set(id, updated);
    return updated;
  }

  async deleteFoodItem(id: string): Promise<boolean> {
    return this.foodItems.delete(id);
  }

  async adjustStock(foodId: string, quantity: number, type: 'add' | 'remove', batchData?: Partial<InsertStockBatch>): Promise<FoodItem | undefined> {
    const item = this.foodItems.get(foodId);
    if (!item) return undefined;
    
    if (type === 'add') {
      item.currentStock += quantity;
    } else {
      item.currentStock = Math.max(0, item.currentStock - quantity);
    }
    
    this.foodItems.set(foodId, item);
    return item;
  }

  async getLowStockItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(item => item.currentStock < item.minStockLevel);
  }

  async getInventoryItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(item => item.inInventory === 1);
  }

  async addToInventory(id: string): Promise<FoodItem | undefined> {
    const item = this.foodItems.get(id);
    if (!item) return undefined;
    item.inInventory = 1;
    this.foodItems.set(id, item);
    return item;
  }

  async removeFromInventory(id: string): Promise<FoodItem | undefined> {
    const item = this.foodItems.get(id);
    if (!item) return undefined;
    item.inInventory = 0;
    this.foodItems.set(id, item);
    return item;
  }

  async getExpiringItems(daysAhead: number): Promise<FoodItem[]> {
    return [];
  }

  async getReorderList(): Promise<FoodItem[]> {
    return this.getLowStockItems();
  }

  async createStockBatch(batch: InsertStockBatch): Promise<StockBatch> {
    const newBatch: StockBatch = {
      id: crypto.randomUUID(),
      ...batch,
      purchaseDate: batch.purchaseDate ? new Date(batch.purchaseDate) : new Date(),
      createdAt: new Date()
    } as StockBatch;
    this.stockBatches.push(newBatch);
    return newBatch;
  }

  async getStockBatchesByFoodItem(foodItemId: string): Promise<StockBatch[]> {
    return this.stockBatches.filter(b => b.foodItemId === foodItemId);
  }

  async getAllStockBatches(): Promise<StockBatch[]> {
    return this.stockBatches;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.get(username);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.id === id);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.getUserById(id);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = crypto.randomUUID();
    const newUser: User = {
      id,
      email: user.email || null,
      firstName: null,
      lastName: null,
      profileImageUrl: null,
      username: user.username || null,
      passwordHash: null,
      role: user.role || null,
      onboardingCompleted: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    if (user.username) {
      this.users.set(user.username, newUser);
    }
    return newUser;
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    const existing = user.username ? this.users.get(user.username) : undefined;
    if (existing) {
      const updated = { ...existing, ...user, updatedAt: new Date() };
      if (user.username) {
        this.users.set(user.username, updated);
      }
      return updated;
    }
    return this.createUser(user as InsertUser);
  }

  async validatePassword(username: string, password: string): Promise<User | null> {
    const user = this.users.get(username);
    if (user && username === "demo") return user;
    return null;
  }

  async updateUserOnboarding(userId: string, completed: boolean): Promise<boolean> {
    const user = Array.from(this.users.values()).find(u => u.id === userId);
    if (!user) return false;
    user.onboardingCompleted = completed ? 1 : 0;
    if (user.username) {
      this.users.set(user.username, user);
    }
    return true;
  }

  async getAllExpenses(): Promise<Expense[]> {
    return Array.from(this.expenses.values());
  }

  async getExpense(id: string): Promise<Expense | undefined> {
    return this.expenses.get(id);
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const id = crypto.randomUUID();
    const newExpense: Expense = {
      id,
      ...expense,
      date: typeof expense.date === 'string' ? new Date(expense.date) : expense.date,
      createdAt: new Date()
    } as Expense;
    this.expenses.set(id, newExpense);
    return newExpense;
  }

  async updateExpense(id: string, expense: InsertExpense): Promise<Expense | undefined> {
    const existing = this.expenses.get(id);
    if (!existing) return undefined;
    const updated = { 
      ...existing, 
      ...expense,
      date: typeof expense.date === 'string' ? new Date(expense.date) : expense.date
    };
    this.expenses.set(id, updated);
    return updated;
  }

  async deleteExpense(id: string): Promise<boolean> {
    return this.expenses.delete(id);
  }

  async getExpensesByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(
      e => e.date >= startDate && e.date <= endDate
    );
  }

  async getAllActivityLogs(): Promise<ActivityLog[]> {
    return this.activityLogs;
  }

  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const newLog: ActivityLog = {
      id: crypto.randomUUID(),
      ...log,
      createdAt: new Date()
    };
    this.activityLogs.push(newLog);
    return newLog;
  }

  async getActivityLogsByDateRange(startDate: Date, endDate: Date): Promise<ActivityLog[]> {
    return this.activityLogs.filter(
      log => log.createdAt >= startDate && log.createdAt <= endDate
    );
  }

  async getGamingCenterInfo(): Promise<GamingCenterInfo | undefined> {
    return this.gamingCenterInfoData || undefined;
  }

  async upsertGamingCenterInfo(info: InsertGamingCenterInfo): Promise<GamingCenterInfo> {
    const newInfo: GamingCenterInfo = {
      id: this.gamingCenterInfoData?.id || crypto.randomUUID(),
      ...info,
      updatedAt: new Date()
    };
    this.gamingCenterInfoData = newInfo;
    return newInfo;
  }

  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values());
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const id = crypto.randomUUID();
    const newImage: GalleryImage = { id, ...image, createdAt: new Date() };
    this.galleryImages.set(id, newImage);
    return newImage;
  }

  async updateGalleryImage(id: string, image: InsertGalleryImage): Promise<GalleryImage | undefined> {
    const existing = this.galleryImages.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...image };
    this.galleryImages.set(id, updated);
    return updated;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  async getAllFacilities(): Promise<Facility[]> {
    return Array.from(this.facilities.values());
  }

  async getFacility(id: string): Promise<Facility | undefined> {
    return this.facilities.get(id);
  }

  async createFacility(facility: InsertFacility): Promise<Facility> {
    const id = crypto.randomUUID();
    const newFacility: Facility = { id, ...facility };
    this.facilities.set(id, newFacility);
    return newFacility;
  }

  async updateFacility(id: string, facility: InsertFacility): Promise<Facility | undefined> {
    const existing = this.facilities.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...facility };
    this.facilities.set(id, updated);
    return updated;
  }

  async deleteFacility(id: string): Promise<boolean> {
    return this.facilities.delete(id);
  }

  async getAllGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getGamesByCategory(category: string): Promise<Game[]> {
    return Array.from(this.games.values()).filter(g => g.category === category);
  }

  async getGame(id: string): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async createGame(game: InsertGame): Promise<Game> {
    const id = crypto.randomUUID();
    const newGame: Game = { id, ...game };
    this.games.set(id, newGame);
    return newGame;
  }

  async updateGame(id: string, game: InsertGame): Promise<Game | undefined> {
    const existing = this.games.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...game };
    this.games.set(id, updated);
    return updated;
  }

  async deleteGame(id: string): Promise<boolean> {
    return this.games.delete(id);
  }

  async getAllLoadMetrics(): Promise<LoadMetric[]> {
    return this.loadMetricsData;
  }

  async getRecentLoadMetrics(limit: number): Promise<LoadMetric[]> {
    return this.loadMetricsData.slice(0, limit);
  }

  async createLoadMetric(metric: InsertLoadMetric): Promise<LoadMetric> {
    const newMetric: LoadMetric = {
      id: crypto.randomUUID(),
      ...metric,
      timestamp: new Date()
    };
    this.loadMetricsData.push(newMetric);
    return newMetric;
  }

  async getCurrentLoad(): Promise<LoadMetric | undefined> {
    return this.loadMetricsData[0];
  }

  async getAllLoadPredictions(): Promise<LoadPrediction[]> {
    return this.loadPredictionsData;
  }

  async getRecentLoadPredictions(limit: number): Promise<LoadPrediction[]> {
    return this.loadPredictionsData.slice(0, limit);
  }

  async createLoadPrediction(prediction: InsertLoadPrediction): Promise<LoadPrediction> {
    const newPrediction: LoadPrediction = {
      id: crypto.randomUUID(),
      ...prediction,
      timestamp: new Date()
    };
    this.loadPredictionsData.push(newPrediction);
    return newPrediction;
  }

  async deleteOldBookingHistory(olderThanDays: number): Promise<number> {
    return 0;
  }

  async deleteOldActivityLogs(olderThanDays: number): Promise<number> {
    return 0;
  }

  async deleteOldLoadMetrics(olderThanDays: number): Promise<number> {
    return 0;
  }

  async deleteOldLoadPredictions(olderThanDays: number): Promise<number> {
    return 0;
  }

  async deleteOldExpenses(olderThanDays: number): Promise<number> {
    return 0;
  }

  async getRetentionConfig(): Promise<RetentionConfig> {
    if (!this.retentionConfigData) {
      this.retentionConfigData = {
        id: crypto.randomUUID(),
        bookingHistoryDays: 36500,
        activityLogsDays: 36500,
        loadMetricsDays: 36500,
        loadPredictionsDays: 36500,
        expensesDays: 36500,
        updatedAt: new Date()
      };
    }
    return this.retentionConfigData;
  }

  async updateRetentionConfig(config: Partial<InsertRetentionConfig>): Promise<RetentionConfig> {
    if (!this.retentionConfigData) {
      await this.getRetentionConfig();
    }
    this.retentionConfigData = {
      ...this.retentionConfigData!,
      ...config,
      updatedAt: new Date()
    };
    return this.retentionConfigData;
  }

  async getAllDeviceMaintenance(): Promise<DeviceMaintenance[]> {
    return Array.from(this.deviceMaintenanceData.values());
  }

  async getDeviceMaintenance(category: string, seatName: string): Promise<DeviceMaintenance | undefined> {
    return this.deviceMaintenanceData.get(`${category}-${seatName}`);
  }

  async upsertDeviceMaintenance(data: InsertDeviceMaintenance): Promise<DeviceMaintenance> {
    const key = `${data.category}-${data.seatName}`;
    const existing = this.deviceMaintenanceData.get(key);
    const newData: DeviceMaintenance = {
      id: existing?.id || crypto.randomUUID(),
      ...data,
      createdAt: existing?.createdAt || new Date(),
      updatedAt: new Date()
    };
    this.deviceMaintenanceData.set(key, newData);
    return newData;
  }

  async updateDeviceMaintenanceStatus(category: string, seatName: string, status: string, notes?: string): Promise<DeviceMaintenance | undefined> {
    const key = `${category}-${seatName}`;
    const existing = this.deviceMaintenanceData.get(key);
    if (!existing) return undefined;
    
    const updated = {
      ...existing,
      status,
      maintenanceNotes: notes || existing.maintenanceNotes,
      updatedAt: new Date()
    };
    this.deviceMaintenanceData.set(key, updated);
    return updated;
  }

  async getAllNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  async getUnreadNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(n => n.isRead === 0);
  }

  async getNotificationById(id: string): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const id = crypto.randomUUID();
    const newNotification: Notification = {
      id,
      ...notification,
      createdAt: new Date()
    };
    this.notifications.set(id, newNotification);
    return newNotification;
  }

  async markNotificationAsRead(id: string): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;
    notification.isRead = 1;
    this.notifications.set(id, notification);
    return notification;
  }

  async markAllNotificationsAsRead(): Promise<void> {
    for (const [id, notification] of this.notifications.entries()) {
      notification.isRead = 1;
      this.notifications.set(id, notification);
    }
  }

  async deleteNotification(id: string): Promise<boolean> {
    return this.notifications.delete(id);
  }

  async getUnreadCount(): Promise<number> {
    return Array.from(this.notifications.values()).filter(n => n.isRead === 0).length;
  }

  async createPaymentLog(log: InsertPaymentLog): Promise<PaymentLog> {
    const newLog: PaymentLog = {
      id: crypto.randomUUID(),
      ...log,
      createdAt: new Date()
    };
    this.paymentLogsData.push(newLog);
    return newLog;
  }

  async getPaymentLogs(date?: string): Promise<PaymentLog[]> {
    if (!date) return this.paymentLogsData;
    const targetDate = new Date(date);
    return this.paymentLogsData.filter(log => {
      const logDate = new Date(log.createdAt);
      return logDate.toDateString() === targetDate.toDateString();
    });
  }

  async updatePaymentStatus(
    bookingIds: string[], 
    paymentStatus: string, 
    paymentMethod: string | null, 
    userId: string
  ): Promise<{ bookings: Booking[], count: number }> {
    const updatedBookings: Booking[] = [];
    
    for (const id of bookingIds) {
      const booking = this.bookings.get(id);
      if (booking) {
        booking.paymentStatus = paymentStatus;
        booking.paymentMethod = paymentMethod;
        this.bookings.set(id, booking);
        updatedBookings.push(booking);
      }
    }
    
    return { bookings: updatedBookings, count: updatedBookings.length };
  }

  async initializeDefaults(): Promise<void> {
    // Already initialized in constructor
  }
}
