import Head from "next/head";
import Landing from "../components/landing/Landing";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <Head>
        <title>PERMIT3</title>
      </Head>
      <div className="h-32">
        <div className="h-16">
          <Navbar fixed={false} />
        </div>
      </div>
      <Landing />
    </>
  );
}
