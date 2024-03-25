import nodemailer from "nodemailer";
import { useCompiler } from "#vue-email";

const config = useRuntimeConfig();

const transporter = nodemailer.createTransport({
  host: config.MAILHOST,
  port: config.MAILPORT,
  auth: {
    user: config.MAILUSER,
    pass: config.MAILPASSWORD,
  },
});

export default defineEventHandler(async (event, response) => {
  try {
    const body = await readBody(event);
    let linkhtml = "";
    let userName = "";
    if (body.getparams) {
      linkhtml = "verificationuser/?cod=" + body.getparams;
      userName = body.username;
    }
    if (body.restore_password) {
      linkhtml = "newpassword/?cod=" + body.restore_password;
    }
    const template = await useCompiler("welcome.vue", {
      props: {
        url: "https://weboko.net/" + linkhtml,
        userFirstname: userName,
      },
    });

    const mail = {
      form: `"${body.username}" <${body.email}>`,
      to: config.CONTACTMAIL,
      subject: body.username,
      html: template.html,
    };
    const mailClient = {
      form: `"${body.username}" <${config.CONTACTMAIL}>`,
      to: body.email,
      subject: body.username,
      text: body.username,
      html: template.html,
    };
    //await transporter.sendMail(mail);
    await transporter.sendMail(mailClient);
  } catch (event) {
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: error,
      })
    );
  }
});
