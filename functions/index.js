const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const standardPath = "/data/pacientes";

const ref = admin.database().ref(standardPath);
const refLogs = admin.database().ref("/data/logs");

// Función para almacenar logs despues de una operación sobre un endpoint.
const logsFunction = (action) => {
  const childRef = refLogs.push();
  childRef.set({
    createdAt: Date.now(),
    message: action,
  });
};

exports.pacientesData = functions.https.onRequest((request, response) => {
  const refById = admin.database().ref(`${standardPath}/${request.query.id}`);
  if (request.method === "GET") {
    if (request.query.id && request.query.id !== "") {
      logsFunction(`Acceso a endpoint GET ${standardPath}/:id`);
      refById.on("value", (snap) => {
        if (snap.val().accesible) {
          return response.status(200).send(JSON.stringify(snap.val()));
        } else {
          return response.status(403).send("No es posible acceder al paciente");
        }
      });
    } else {
      logsFunction(`Acceso a endpoint GET ${standardPath}`);
      ref.on("value", (snap) =>
        response.status(200).send(JSON.stringify(snap.val()))
      );
    }
  }

  if (request.method === "POST" && request.body) {
    logsFunction(`Acceso a endpoint POST ${standardPath}`);
    const childRef = ref.push();
    childRef.set({
      name: request.body.name,
      momLastName: request.body.momLastName,
      dadLastName: request.body.dadLastName,
      socialSecurity: request.body.socialSecurity,
      accesible: request.body.accesible,
    });

    return response.status(200).send("Usuario guardado correctamente.");
  }
});
