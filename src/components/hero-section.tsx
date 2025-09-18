import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroHeader } from "./header";
import LogoCloud from "./logo-cloud";
import handsImage from "@/assets/hands.png";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-zinc-300 to-zinc-100">
      {/* Header com z-index alto para ficar na frente */}
      <div className="relative z-30">
        <HeroHeader />
      </div>

      {/* Imagem de fundo que cobre toda a seção */}
      <Image
        className="absolute inset-0 h-full w-full object-cover z-0"
        src={handsImage}
        alt="Abstract Object"
        priority
      />

      {/* Overlay com gradiente para fazer o fading */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100  to-transparent lg:from-zinc-100/95 lg:via-zinc-100/80 lg:to-zinc-100/20 z-10"></div>

      <main className="relative z-20 overflow-x-hidden">
        <section className="relative overflow-hidden">
          {/* Conteúdo principal */}
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                  Saia do manual
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  Com a RGIT você automatiza sua gestão de empréstimos.
                </p>
                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="px-5 text-base">
                    <a
                      href="https://calendar.app.google/LQJnwcAN24RkA6Rj8"
                      target="_blank"
                    >
                      <span className="text-nowrap">Agende uma reunião</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LogoCloud também ficará sobre a imagem */}
        <LogoCloud />
      </main>
    </div>
  );
}
