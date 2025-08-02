// pages/index.js
export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/crm',
      permanent: true, // Usa 301
    },
  };
}

export default function Home() {
  return null;
}
