import { z } from "zod";

// Runtime schemas used by server and client
export const insertTripSchema = z.object({
  userId: z.number(),
  title: z.string().min(1),
  destination: z.string().min(1),
  // accept Date objects or ISO strings
  startDate: z.union([z.date(), z.string()]).optional(),
  endDate: z.union([z.date(), z.string()]).optional(),
  budget: z.string().optional(),
  budgetIsEstimated: z.boolean().optional(),
  // preferences can be an array of strings or arbitrary JSON
  preferences: z.union([z.array(z.string()), z.record(z.any())]).optional(),
  status: z.string().optional(),
  itineraryData: z.any().optional(),
});

export const insertReviewSchema = z.object({
  userId: z.number(),
  targetType: z.string(), // e.g., 'hotel' | 'flight' | 'destination'
  targetId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().min(1),
});

export const insertUserSettingsSchema = z.object({
  userId: z.number(),
  theme: z.string().optional(),
  notificationsEnabled: z.boolean().optional(),
  // store arbitrary settings as JSON
  preferences: z.record(z.any()).optional(),
});

// Legacy value import (not used at runtime in current code)
export const myTrips = {};

// Type placeholders to satisfy type-only imports. Replace with real types if needed.
// Using 'unknown' to avoid unsafe 'any' while remaining permissive.
export type User = unknown;
export type InsertUser = unknown;
export type Trip = unknown;
export type InsertTrip = z.infer<typeof insertTripSchema>;
export type Destination = unknown;
export type InsertDestination = unknown;
export type Review = unknown;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type FlightSearch = unknown;
export type InsertFlightSearch = unknown;
export type UserSettings = unknown;
export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
export type WishlistItem = unknown;
export type InsertWishlistItem = unknown;
export type FlightBooking = unknown;
export type InsertFlightBooking = unknown;
export type HotelSearch = unknown;
export type InsertHotelSearch = unknown;
export type HotelBooking = unknown;
export type InsertHotelBooking = unknown;
export type AdminLog = unknown;
export type InsertAdminLog = unknown;


