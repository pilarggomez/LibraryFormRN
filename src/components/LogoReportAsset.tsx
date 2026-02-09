import React from "react";
import { Button, Alert } from "react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { createAndSharePdf } from "../services/pdfService";

export default function LogoReportAsset() {
  const generateReport = async () => {
    try {
      const asset = Asset.fromModule(
        require("../../assets/library-logo.jpg")
      );

      await asset.downloadAsync();

      if (!asset.localUri) throw new Error();

      const base64Logo = await FileSystem.readAsStringAsync(
        asset.localUri,
        { encoding: "base64" }
      );

      const html = `
        <body style="font-family:Arial;padding:20px">
          <div style="display:flex;align-items:center;margin-bottom:20px">
            <img src="data:image/jpeg;base64,${base64Logo}" width="80"/>
            <div style="margin-left:15px">
              <h1 style="margin:0">Biblioteca Central</h1>
              <p style="margin:0">Informe de préstamos</p>
            </div>
          </div>

          <hr/>

          <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>

          <h2>Resumen</h2>
          <ul>
            <li>Total de libros: 120</li>
            <li>Socios activos: 45</li>
            <li>Préstamos hoy: 8</li>
          </ul>

          <h2>Detalle de préstamos</h2>

          <table border="1" width="100%" cellpadding="6" cellspacing="0">
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Socio</th>
              <th>Fecha</th>
            </tr>
            <tr>
              <td>1984</td>
              <td>George Orwell</td>
              <td>Ana López</td>
              <td>01/02/2026</td>
            </tr>
            <tr>
              <td>Dune</td>
              <td>Frank Herbert</td>
              <td>Juan Pérez</td>
              <td>02/02/2026</td>
            </tr>
          </table>

          <p style="font-size:12px;color:gray">
            Documento generado automáticamente desde la app.
          </p>
        </body>
      `;

      await createAndSharePdf(html);
    } catch {
      Alert.alert("Error", "No se pudo generar el PDF");
    }
  };

  return (
    <Button
      title="Generar informe PDF (logo local)"
      onPress={generateReport}
    />
  );
}
