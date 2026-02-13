export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { token } = req.body;

  const secret = process.env.RECAPTCHA_SECRET;

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `secret=${secret}&response=${token}`
  });

  const data = await response.json();

  if (data.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
}
