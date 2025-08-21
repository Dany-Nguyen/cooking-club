import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  color: string;
}

export function FeatureCard({ icon: Icon, title, description, image, color }: FeatureCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className={`absolute top-4 left-4 p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>
        <Button variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-primary/80">
          Learn more →
        </Button>
      </CardContent>
    </Card>
  );
}
