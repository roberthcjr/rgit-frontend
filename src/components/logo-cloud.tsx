import Image from "next/image";

export default function LogoCloud() {
  return (
    <section className="py-16 bg-white/10 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-lg font-medium">
          Onde já fizemos a diferença.
        </h2>
        <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
          <Image
            className="h-15 w-fit dark:invert"
            src="https://fermag.ind.br/wp-content/uploads/2024/04/Logo-Fermag.png"
            alt="Fermag Logo"
            height={20}
            width={400}
          />
        </div>
      </div>
    </section>
  );
}
