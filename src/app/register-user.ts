"use server";

import * as v from "valibot";
import { getSession } from "../lib/session";
import { redirect } from "next/navigation";

const ValueSchema = v.object({
  name: v.string("氏名を入力してください"),
  id: v.string("会員番号を入力してください"),
  membershipExpiry: v.string("有効期限を入力してください"),
});

export async function registerUser(formData: FormData) {
  const name = formData.get("name");
  const id = formData.get("id");
  const membershipExpiry = formData.get("membershipExpiry");

  const inputValues = v.parse(ValueSchema, {
    name,
    id,
    membershipExpiry,
  });

  const session = await getSession();

  session.destroy();

  session.id = inputValues.id;
  session.name = inputValues.name;
  session.membershipExpiry = inputValues.membershipExpiry;

  await session.save();

  redirect("/membership-card");
}
