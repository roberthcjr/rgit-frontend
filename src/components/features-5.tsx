import { Activity, Blocks, Proportions, Zap } from "lucide-react";
import Image from "next/image";
import dashboardImage from "@/assets/emprestimo-dash.png";

export default function FeaturesSection() {
  return (
    <section
      className="py-16 md:py-32 bg-gradient-to-b from-zinc-100 to-zinc-300"
      id="features"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <h2 className="text-4xl font-semibold lg:text-5xl">
                Construído para simplificar a gestão de empréstimos
              </h2>
              <p className="mt-6">
                Com a RGIT você evitará processos manuais que são passsíveis de
                erros humanos.
              </p>
            </div>
            <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
              <li>
                <Proportions className="size-5" />
                Interface intuitiva
              </li>
              <li>
                <Zap className="size-5" />
                Respostas rápidas
              </li>
              <li>
                <Activity className="size-5" />
                Monitoramento
              </li>
              <li>
                <Blocks className="size-5" />
                Integração com sistemas externos
              </li>
            </ul>
          </div>
          <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
            <div className="bg-linear-to-b aspect-106/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <Image
                src={dashboardImage}
                className="rounded-[15px] shadow dark:hidden"
                alt="emprestimos illustration light"
                width={1207}
                height={929}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
