import { FormLayout } from "../../components/Layouts/FormLayout";

/** プロフィール入力画面（仮） */
export const ProfilePage = () => {
  return (
    <FormLayout title="プロフィール設定">
      <div className="mt-16 rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">
          会員情報の入力画面はこれから作成します
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-600">
          メール認証は完了しました。
          <br />
          次の導線として、まずはこの画面で会員情報を入力してもらう想定です。
        </p>
      </div>
    </FormLayout>
  );
};
