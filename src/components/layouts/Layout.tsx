import Head from "next/head";
import { FC, ReactNode } from "react";
import { Navbar } from "../ui/Navbar";

interface Props {
  children: ReactNode;
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ?? "Pokemon App"}</title>
        <meta name="author" content="Orealy dev" />
        <meta
          name="description"
          content={`Información sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemom, pokedex`} />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la información sobre ${title}`}
        />
        <meta
          property="og:image"
          content={`${origin}/imgs/banner.png`}
        />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
