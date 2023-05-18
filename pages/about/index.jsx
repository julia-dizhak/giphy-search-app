import Head from "next/head";
import { useRouter } from "next/router";

const About = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-3 text-4xl font-semibold pt-6 pb-6">About</h1>

      <p className="pl-24 pr-24">
        Love giphys? So do we. use our app <b>giphy search</b> to find the
        perfect giphy for any occasion.
      </p>

      <h2 className="mb-3 text-2xl font-semibold pt-6 pb-6">
        Why do people love giphys?
      </h2>

      <p className="pl-24 pr-24 pb-6">
        Some people may work better with words, others with numbers, but
        everyone gets pictures. 90% of information transmitted to the human
        brain is visual.
      </p>

      <p className="pl-24 pr-24 pb-6">
        The old saying - a picture is worth a thousand words - is quite cliche.
        But that does not make it any less true, especially in marketing and
        particularly in the instant-gratification, short attention span world we
        live in today. Getting folks to retain (or even register) your messages
        and content or take action is harder than ever, especially if all you
        are giving them is words.
      </p>

      <p className="pl-24 pr-24">
        Images are stronger than words. However, the fast-moving nature of GIFs
        make them stronger than images and their shorter length make them more
        digestible than video. Thatis the short answer.
      </p>

      <button
        type="button"
        className="bg-sky-500 hover:bg-sky-700"
        onClick={() => router.push("/")}
      >
        Home page
      </button>
    </div>
  );
};

export default About;
