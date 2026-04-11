import Header from "./Header/Header";

type FormLayoutProps = {
  title: string;
  children: React.ReactNode;
};

/** 認証・登録画面のコンポーネント */
export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-[800px] mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>

          {children}
        </div>
      </div>
    </>
  );
};
