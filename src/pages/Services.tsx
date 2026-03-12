import { Search, Phone, Globe, MapPin, Clock, Info } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { serviceCategories, type Service, type ServiceCategory } from "@/lib/services-data";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = serviceCategories
    .map(category => ({
      ...category,
      services: category.services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => 
      selectedCategory ? category.id === selectedCategory : category.services.length > 0
    );

  const ServiceCard = ({ service }: { service: Service }) => (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-start justify-between">
          <span>{service.name}</span>
          <Badge variant="outline" className="text-xs">
            מומלץ
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm">
          {service.description}
        </p>
        
        <div className="space-y-2 text-sm">
          {service.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{service.phone}</span>
            </div>
          )}
          
          {service.website && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>{service.website}</span>
            </div>
          )}
          
          {service.address && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{service.address}</span>
            </div>
          )}
          
          {service.hours && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{service.hours}</span>
            </div>
          )}
          
          {service.notes && (
            <div className="flex items-start gap-2 text-muted-foreground">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="text-xs">{service.notes}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            צור קשר
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            פרטים נוספים
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const CategorySection = ({ category }: { category: ServiceCategory }) => (
    <section className="space-y-4" id={category.id}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{category.name}</h2>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
        <Badge className={category.color} variant="outline">
          {category.services.length} שירותים
        </Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {category.services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">מדריך שירותים וספקים</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          מדריך מקיף לכל השירותים, הספקים והגורמים המקצועיים בתחום הטיפול בקשישים
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חפש שירותים או ספקים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            כל הקטגוריות
          </Button>
          {serviceCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Service Categories */}
      <div className="space-y-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">לא נמצאו שירותים התואמים לחיפוש שלך</p>
          </div>
        ) : (
          filteredCategories.map(category => (
            <CategorySection key={category.id} category={category} />
          ))
        )}
      </div>

      {/* Quick Navigation */}
      <div className="bg-muted/50 rounded-lg p-6 mt-12">
        <h3 className="text-lg font-semibold mb-4">ניווט מהיר</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {serviceCategories.map(category => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              className="justify-start h-auto py-2"
              onClick={() => {
                setSelectedCategory(null);
                document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold mb-2">לא מצאתם את מה שחיפשתם?</h3>
        <p className="text-muted-foreground mb-4">
          צרו איתנו קשר ונעזור לכם למצוא את הספק המתאים ביותר לצרכיכם
        </p>
        <Button size="lg">
          צור קשר לייעוץ אישי
        </Button>
      </div>
    </div>
  );
};

export default Services;