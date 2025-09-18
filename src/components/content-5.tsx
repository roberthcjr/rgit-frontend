import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import Image from "next/image";

export default function ContentSection() {
  return (
    <section
      className="py-16 md:py-32 bg-gradient-to-b from-zinc-300 to-zinc-100"
      id="solutions"
    >
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            A RGIT se adapta ao seu negócio.
          </h2>
          <p>
            A RGIT nasceu para simplificar a gestão de empréstimos de
            ferramentas, mas sua plataforma vai muito além disso. Nossa solução
            é flexível e se adapta a qualquer tipo de negócio que trabalhe com
            empréstimos — de equipamentos e materiais a itens corporativos ou
            pessoais. Com tecnologia intuitiva e segura, ajudamos você a ter
            mais controle, organização e eficiência no dia a dia.
          </p>
        </div>
        <Image
          className="rounded-(--radius) grayscale"
          src="https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="team image"
          width={2940} // defina a largura original da imagem ou a que deseja renderizar
          height={1960} // defina a altura proporcional da imagem
          loading="lazy"
        />
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">Super rápida</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Respostas imediatas que serão vistas no dashboard.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4" />
              <h3 className="text-sm font-medium">Poderosa</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Garante uma robustez nos seus dados.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="size-4" />
              <h3 className="text-sm font-medium">Segura</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Ambiente exclusivo para sua empresa e seus dados.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />

              <h3 className="text-sm font-medium">Intuitiva</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Com o design simples e eficaz, faz seu trabalho ser rápido.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
