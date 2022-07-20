"use strict";

import nodemailer from "nodemailer";
import {data} from "../../const";

const ownerEmail = "efleischmann@kiberdigital.com";

/**
 * {
 * 	"email":"test@test.de",
 * 	"lastName":"lastName",
 * 	"gender":"male",
 * 	"body":"<requestBody>"
 * }
 */
export default function handler(req, res) {
    if (!req.body.email || !req.body.lastName) {
        res.status(400).json({response: 'email or lastName is not correct'})
    }
    const gender = req.body.gender.substring(0, 100);
    const email = req.body.email.substring(0, 100);
    const lastName = req.body.lastName.substring(0, 100);
    const formBody = req.body.formBody.substring(0, 1000);

    emailOwner(ownerEmail, formBody).catch(console.error).then(() => {
        emailCustomer(email, lastName, gender).catch(console.error).then(() => {
            res.status(200).json({response: 'E-Mail is on the way'})
        });
    });
}
function getSendGridTransport() {
    return nodemailer.createTransport({
        host: "smtp.sendgrid.net", port: 587, auth: {
            user: "apikey", pass: process.env.SENDGRID_API_KEY,
        },
    });

}

async function emailCustomer(email, lastName, gender) {
    const finalGender = gender === data['gender'][1].value ? 'Monsieur' : 'Madame';
    let info = await getSendGridTransport().sendMail({
        from: '"Cosmedica - Dr. Acar 👩🏻‍⚕️" <alina@cosmedica.com>',
        to: email,
        subject: "Cosmedica – Dr. Acar",
        text: "Cosmedica – Dr. Acar",
        html: "<p>Cher  " + finalGender + " " + lastName + ", </p>" +
            "<p>Merci de nous avoir envoyé vos coordonnées et de votre intérêt pour une évaluation et une consultation capillaire gratuite.</p>" +
            "<p>Pour une évaluation capillaire qualifiée, nous avons besoin de photos de votre situation capillaire actuelle.  Si vous ne nous avez pas encore envoyé de photos, vous pouvez le faire en cliquant sur le lien suivant :</p>" +
            "<a href='https://cosmedica.com/thank-you-request/'>Télécharger des photos d'analyse de cheveux \n</a>" +

            "<p> Nos experts vous contacteront et élaboreront pour vous une offre individuelle et optimale.  Nous serons également heureux de répondre à toutes vos questions. Nous sommes impatients de vous contacter bientôt et vous souhaitons tout le meilleur. \n</p>" +

            "<b>Votre équipe Cosmedica - Dr. Acar,\n</b>" +

            "<p style='font-size: 0.875em;'>" +
            "T  : <a href=\"tel:+90 544 556 05 55\">+90 544 556 05 55</a></p>" +
            "<p style='font-size: 0.875em;'>" +
            "E  : <a href=\"mailto:info@cosmedica.com\">info@cosmedica.com</a></p>" +
            "<p style='font-size: 0.875em;'>" +
            "W  : <a href='https://www.cosmedica.com'> www.cosmedica.com</a></p>" + "<p style='font-size: 0.875em;'>" +
            "A  :  Etiler, Nisbetiye Mah, Başlık Sk.  No: 3, 34337 Beşiktaş/İstanbul, Turquie</p>",

        // "<img src='' alt='logo'/>",
    });

    console.log("Message sent: %s", info.messageId);
}

async function emailOwner(email, formBody) {
    let info = await getSendGridTransport().sendMail({
        from: '"Cosmedica Online Consultation" <alina@cosmedica.com>',
        to: email,
        subject: "Consultation en ligne de Cosmedica",
        text: "Analyse capillaire en ligne Prestep",
        html: "<div>" + formBody + "</div>",
    });

    console.log("Message sent: %s", info.messageId);
}



