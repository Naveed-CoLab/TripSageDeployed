import { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { useQuery } from "@tanstack/react-query";
import DestinationCard from "@/components/trips/destination-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { sampleDestinations } from "@/data/sample-destinations";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const { toast } = useToast();
  
  const { data: destinations, isLoading, error } = useQuery<any[]>({
    queryKey: ["/api/destinations"],
  });
  
  const regions = ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"];
  
  const filteredDestinations = destinations
    ? destinations.filter((d: any) => {
        const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            d.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            d.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRegion = regionFilter === "all" || 
                            (d.region && d.region.toLowerCase() === regionFilter.toLowerCase());
        
        return matchesSearch && matchesRegion;
      })
    : [];
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover incredible destinations around the world and get inspired for your next adventure
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region.toLowerCase()}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden border">
                <Skeleton className="h-52 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Error loading destinations</h3>
            <p className="mt-2 text-sm text-gray-500">
              {(error as Error).message || "An unknown error occurred"}
            </p>
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination: any) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No destinations found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
        
        {/* Placeholder for destinations if API has no data yet */}
        {(!destinations || destinations.length === 0) && !isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDestinations
            .filter(d => {
              const matchesSearch = searchTerm === "" ||
                d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                d.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.description.toLowerCase().includes(searchTerm.toLowerCase());
              
              const matchesRegion = regionFilter === "all" || 
                                  (d as any).region?.toLowerCase() === regionFilter.toLowerCase();
              
              return matchesSearch && matchesRegion;
            })
            .map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
