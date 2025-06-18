"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface HeroBottomProps {
  icons: string[];
}

export default function HeroBottom({ icons }: HeroBottomProps) {
  const plugin = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
    })
  );

  return (
    <div className="container">
      <div className="p-4 w-10/12 m-auto">
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full"
        >
          <CarouselContent className="flex items-center gap-4">
            {icons.map((src, idx) => (
              <CarouselItem
                key={idx}
                className="basis-1/4 md:basis-1/6 lg:basis-1/7 flex justify-center"
              >
                <Image
                  src={src}
                  alt={`icon-${idx}`}
                  width={40}
                  height={40}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
