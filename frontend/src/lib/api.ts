export type OrderItem = { id: string; qty: number };
export type OrderPayload = {
  email: string;
  name?: string;
  note?: string;
  items: OrderItem[];
};

export async function sendOrder(payload: OrderPayload): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),

    });
    return res.ok;
  } catch (e) {
    console.error("sendOrder error", e);
    return false;
  }
}
