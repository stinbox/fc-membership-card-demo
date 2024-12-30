import { registerUser } from "./register-user";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <div className="p-8 grid place-items-center h-dvh">
      <Form action={registerUser} className="w-96 mx-auto">
        <Input isRequired name="id" type="text" label="会員番号" />

        <Input isRequired name="name" type="text" label="氏名" />

        <Input
          isRequired
          name="membershipExpiry"
          type="date"
          label="有効期限"
          defaultValue="2030-12-31"
        />

        <Button type="submit" color="primary">
          QRコード表示
        </Button>
      </Form>
    </div>
  );
}
