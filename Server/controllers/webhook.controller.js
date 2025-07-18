import { Webhook } from "svix";
import User from "../models/userSchema.model.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // create a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString(); // raw body
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const event = whook.verify(payload, headers); // verify raw body

    const { data, type } = event;

    // switch case for different events

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);

        res.json({
          success: true,
          message: "User created successfully",
        });
        break;
      }
      case "user.updated": {
        const userData = {
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
          resume: "",
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({
          success: true,
          message: "User updated successfully",
        });
        break;
      }

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        res.json({
          success: true,
          message: "User deleted successfully",
        });
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Webhooks error",
      error: error.message,
    });
  }
};
