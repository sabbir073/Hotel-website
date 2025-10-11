interface PermitData {
  license_number: string;
  date_of_issue: string;
  valid_from: string;
  valid_until: string;
  employee_name: string;
  employee_address: string;
  date_of_birth: string;
  passport_number: string;
  passport_issued_in: string;
  citizenship: string;
  company_name: string;
  company_address: string;
  mbs: string;
  oib: string;
  occupation: string;
  salary: number;
}

export function generateWorkPermitHTML(data: PermitData): string {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('hr-HR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
  };

  return `
<!DOCTYPE html>
<html lang="hr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dozvola za Boravak i Rad</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #000;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      page-break-after: always;
      position: relative;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header-logos {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      gap: 20px;
    }

    .header-title {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .header-subtitle {
      font-size: 10pt;
    }

    .barcode {
      position: absolute;
      top: 20mm;
      right: 20mm;
      width: 80px;
      height: 40px;
      background: #000;
    }

    .permit-info {
      margin-bottom: 15px;
      font-size: 10pt;
    }

    .permit-info div {
      margin-bottom: 3px;
    }

    h2 {
      font-size: 13pt;
      font-weight: bold;
      margin: 15px 0 10px 0;
      text-transform: uppercase;
    }

    h3 {
      font-size: 11pt;
      font-weight: bold;
      margin: 12px 0 8px 0;
      text-transform: uppercase;
    }

    .section {
      margin-bottom: 15px;
    }

    .field {
      display: flex;
      margin-bottom: 5px;
    }

    .field-label {
      flex: 0 0 180px;
      font-weight: normal;
    }

    .field-value {
      flex: 1;
      font-weight: bold;
    }

    .signature-section {
      margin-top: 40px;
      text-align: center;
    }

    .signature-line {
      width: 250px;
      margin: 50px auto 10px;
      border-top: 1px solid #000;
      text-align: center;
    }

    .signature-title {
      font-weight: bold;
      margin-top: 5px;
    }

    .contract-header {
      background: #f5f5f5;
      padding: 10px;
      text-align: center;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .article {
      margin-bottom: 15px;
    }

    .article-title {
      font-weight: bold;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .article-content {
      text-align: justify;
      margin-bottom: 8px;
    }

    ul {
      margin-left: 20px;
      margin-top: 5px;
    }

    li {
      margin-bottom: 3px;
    }

    .stamp {
      position: absolute;
      bottom: 80px;
      right: 80px;
      width: 120px;
      height: 120px;
      border: 2px solid #0066cc;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-15deg);
    }

    .stamp-text {
      text-align: center;
      color: #0066cc;
      font-weight: bold;
      font-size: 9pt;
    }
  </style>
</head>
<body>

<!-- PAGE 1: Work and Residence Permit -->
<div class="page">
  <div class="header">
    <div class="header-title" style="font-size: 14pt;">DOZVOLA ZA BORAVAK I RAD</div>
    <div class="header-subtitle">REPUBLIKA HRVATSKA</div>
    <div class="header-subtitle">MINISTARSTVO UNUTARNJIH POSLOVA</div>
    <div class="header-subtitle">POLICIJSKA UPRAVA PRIMORSKO-GORANSKA</div>
  </div>

  <div class="barcode"></div>

  <div class="permit-info">
    <div>Broj dozvole: <strong>${data.license_number}</strong></div>
    <div>Datum izdavanja: <strong>${formatDate(data.date_of_issue)}</strong></div>
    <div>Vrijedi od: <strong>${formatDate(data.valid_from)}</strong></div>
    <div>Vrijedi do: <strong>${formatDate(data.valid_until)}</strong></div>
  </div>

  <h2>RJEŠENJE</h2>
  <p style="margin-bottom: 10px;">Na temelju članka 80. stavka 1. Zakona o strancima (NN 130/11, 74/13, 69/17), izdaje se:</p>
  <p style="font-weight: bold; margin-bottom: 15px;">DOZVOLA ZA BORAVAK I RAD</p>
  <p style="margin-bottom: 15px;">(prema godišnjoj kvoti)</p>

  <h3>OSOBNI PODACI STRANOG RADNIKA:</h3>
  <div class="section">
    <div class="field">
      <span class="field-label">Ime i prezime</span>
      <span class="field-value">: ${data.employee_name}</span>
    </div>
    <div class="field">
      <span class="field-label">Datum rođenja</span>
      <span class="field-value">: ${formatDate(data.date_of_birth)}</span>
    </div>
    <div class="field">
      <span class="field-label">Broj putovnice</span>
      <span class="field-value">: ${data.passport_number}</span>
    </div>
    <div class="field">
      <span class="field-label">Izdano u</span>
      <span class="field-value">: ${data.passport_issued_in}</span>
    </div>
    <div class="field">
      <span class="field-label">Državljanstvo</span>
      <span class="field-value">: ${data.citizenship}</span>
    </div>
  </div>

  <h3>POSLODAVAC:</h3>
  <div class="section">
    <div class="field">
      <span class="field-label">Naziv tvrtke</span>
      <span class="field-value">: ${data.company_name}</span>
    </div>
    <div class="field">
      <span class="field-label">Adresa tvrtke</span>
      <span class="field-value">: ${data.company_address}</span>
    </div>
    <div class="field">
      <span class="field-label">OIB</span>
      <span class="field-value">: ${data.oib}</span>
    </div>
    <div class="field">
      <span class="field-label">MBS</span>
      <span class="field-value">: ${data.mbs}</span>
    </div>
  </div>

  <h3>DETALJI ZAPOSLENJA:</h3>
  <div class="section">
    <div class="field">
      <span class="field-label">Zanimanje</span>
      <span class="field-value">: ${data.occupation}</span>
    </div>
    <div class="field">
      <span class="field-label">Mjesto rada</span>
      <span class="field-value">: ${data.company_address}</span>
    </div>
    <div class="field">
      <span class="field-label">Radno vrijeme</span>
      <span class="field-value">: Puno radno vrijeme (40 sati tjedno)</span>
    </div>
  </div>

  <h3>OBRAZLOŽENJE</h3>
  <p style="margin-bottom: 15px;">Utvrđeno je da su ispunjeni uvjeti iz članka 54. i članka 75. Zakona o strancima.</p>

  <h3>UPUTA O PRAVNOM LIJEKU</h3>
  <p style="margin-bottom: 15px;">Protiv ovog rješenja može se izjaviti žalba Povjerenstvu za žalbe u roku od 15 dana od dana dostave.</p>

  <h3>PRISTOJBA</h3>
  <p style="margin-bottom: 15px;">Plaćena upravna pristojba: 125 Euro (Tar. br. 9. točka 1., NN 8/17, 37/17, 129/17)</p>

  <h3>DOSTAVITI:</h3>
  <div style="margin-left: 20px; margin-bottom: 20px;">
    <div>1. Zaposleniku – ${data.employee_name}</div>
    <div>2. Poslodavcu – ${data.company_name}</div>
    <div>3. Poreznoj upravi</div>
    <div>4. Arhiva</div>
  </div>

  <div class="signature-section">
    <div class="signature-line">
      <div class="signature-title">NAČELNIK</div>
      <div class="signature-title">POLICIJSKE UPRAVE</div>
      <div style="margin-top: 10px;">HARI BRNAD</div>
    </div>
  </div>

  <div class="stamp">
    <div class="stamp-text">REPUBLIKA<br>HRVATSKA<br>MINISTARSTVO<br>UNUTARNJIH<br>POSLOVA</div>
  </div>
</div>

<!-- PAGE 2: Employment Contract Part 1 -->
<div class="page">
  <div class="header">
    <div class="header-title" style="font-size: 14pt; color: #FF6600;">REPUBLIC OF</div>
    <div class="header-title" style="font-size: 18pt; color: #0066cc;">CROATIA</div>
  </div>

  <div class="barcode"></div>

  <div class="contract-header">
    UGOVOR O RADU<br>NA ODREĐENO VRIJEME
  </div>

  <p style="margin-bottom: 15px;"><strong>UGOVOR O RADU NA ODREĐENO VRIJEME</strong></p>
  <p style="margin-bottom: 15px;">Završeno ${formatDate(data.date_of_issue)}:</p>

  <h3>POSLODAVAC:</h3>
  <div class="section">
    <div class="field">
      <span class="field-label">Naziv tvrtke</span>
      <span class="field-value">: ${data.company_name} za usluge</span>
    </div>
    <div class="field">
      <span class="field-label">OIB</span>
      <span class="field-value">: ${data.oib}</span>
    </div>
    <div class="field">
      <span class="field-label">MBS</span>
      <span class="field-value">: ${data.mbs}</span>
    </div>
    <div class="field">
      <span class="field-label">Datum osnivanja</span>
      <span class="field-value">: 27.02.2020.</span>
    </div>
    <div class="field">
      <span class="field-label">EUID</span>
      <span class="field-value">: HRSR.${data.mbs}</span>
    </div>
    <div class="field">
      <span class="field-label">MB DZS</span>
      <span class="field-value">: 05239001</span>
    </div>
    <div class="field">
      <span class="field-label">Adresa tvrtke</span>
      <span class="field-value">: ${data.company_address}</span>
    </div>
    <div class="field">
      <span class="field-label">Registarsko tijelo</span>
      <span class="field-value">: Trgovački sud u Splitu</span>
    </div>
  </div>

  <h3>ZAPOSLENIK:</h3>
  <div class="section">
    <div class="field">
      <span class="field-label">Ime i prezime</span>
      <span class="field-value">: ${data.employee_name}</span>
    </div>
    <div class="field">
      <span class="field-label">Adresa</span>
      <span class="field-value">: ${data.employee_address}</span>
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 1. (PREDMET UGOVORA)</div>
    <div class="article-content">
      Ovim Ugovorom o radu na određeno vrijeme, koji vrijedi od ${formatDate(data.valid_from)}. do ${formatDate(data.valid_until)}. godine,
      uređuju se međusobna prava, obveze i odgovornosti iz radnog odnosa između poslodavca i zaposlenika.
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 2. (MJESTO I VRSTA POSLA)</div>
    <div class="article-content">
      Zaposlenik zasniva radni odnos na radnom mjestu: ${data.occupation}, s punim radnim
      vremenom od 40 sati tjedno na adresi poslodavca: Republika Hrvatska, ${data.company_address}
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 3. (POČETAK RADA)</div>
    <div class="article-content">
      Zaposlenik počinje s radom danom ishođenja dozvole za boravak i rad.
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 4. (NAČIN OBAVLJANJA POSLA)</div>
    <div class="article-content">
      Zaposlenik će ugovorene poslove obavljati osobno, savjesno i odgovorno, sukladno uputama
      poslodavca te primjenjujući sva pravila struke.
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 5. (PLAĆA)</div>
    <div class="article-content">
      Za obavljeni rad zaposlenik ima pravo na mjesečnu bruto plaću u iznosu od ${parseFloat(data.salary.toString()).toFixed(2)} Euro.
      Plaća se uvećava za:
    </div>
    <ul>
      <li>prekovremeni rad: 50%</li>
      <li>rad blagdanom i neradnim danom: 50%</li>
      <li>rad nedjeljom: 30%</li>
      <li>noćni rad: 30%</li>
    </ul>
  </div>

  <div class="signature-section" style="margin-top: 60px;">
    <div style="text-align: right; margin-right: 60px;">
      <div class="signature-line" style="width: 200px; margin: 0 0 10px auto;">
        <div class="signature-title">POSLODAVAC</div>
        <div class="signature-title">VODITELJ ADMINISTRACIJE</div>
      </div>
    </div>
  </div>

  <div class="stamp">
    <div class="stamp-text">REPUBLIKA<br>HRVATSKA<br>MINISTARSTVO<br>UNUTARNJIH<br>POSLOVA</div>
  </div>
</div>

<!-- PAGE 3: Employment Contract Part 2 -->
<div class="page">
  <div class="header">
    <div class="header-title" style="font-size: 14pt; color: #FF6600;">REPUBLIC OF</div>
    <div class="header-title" style="font-size: 18pt; color: #0066cc;">CROATIA</div>
  </div>

  <div class="barcode"></div>

  <div class="contract-header">
    UGOVOR O RADU<br>NA ODREĐENO VRIJEME
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 6. (ISPLATA PLAĆE)</div>
    <div class="article-content">
      Poslodavac se obvezuje isplaćivati plaću jednom mjesečno, najkasnije do 15. dana u tekućem mjesecu za prethodni mjesec.
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 7. (NAKNADA PLAĆE)</div>
    <div class="article-content">
      Zaposlenik ima pravo na naknadu plaće za opravdano izostajanje, sukladno Zakonu o radu.
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 8. (STANKA)</div>
    <div class="article-content">
      Zaposlenik ima pravo na stanku od 30 minuta svakog radnog dana, u dogovoru s poslodavcem.
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 9. (GODIŠNJI ODMOR)</div>
    <div class="article-content">
      Zaposlenik ima pravo na 24 radna dana plaćenog godišnjeg odmora nakon šest mjeseci neprekidnog
      rada. Ako ugovor prestane prije tog roka, pripada mu 1/12 odmora za svaki mjesec rada.
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 10. (OTKAZ UGOVORA)</div>
    <div class="article-content">Obje strane mogu otkazati ugovor prije isteka roka:</div>
    <ul>
      <li>zaposlenik: 30 dana otkaznog roka</li>
      <li>poslodavac: 15 dana otkaznog roka</li>
      <li>izvanredni otkaz moguć u slučaju teže povrede obveza.</li>
    </ul>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 11. (RJEŠAVANJE SPOROVA)</div>
    <div class="article-content">
      Sporovi se rješavaju mirnim putem, a ako to nije moguće, nadležan je sud u Bujama.
    </div>
  </div>

  <div class="article">
    <div class="article-title">ČLANAK 12. (ZAVRŠNE ODREDBE)</div>
    <div class="article-content">
      Ugovor je sastavljen u dva primjerka, jedan za svaku stranu.
    </div>
  </div>

  <div style="margin-top: 50px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 60px;">
      <div>
        <div>Za poslodavca:</div>
        <div style="margin-top: 40px; border-top: 1px solid #000; width: 200px; padding-top: 5px;">
          <strong>Mia Baturina</strong><br>
          Direktor (član uprave)
        </div>
      </div>

      <div>
        <div>Za zaposlenika:</div>
        <div style="margin-top: 40px; border-top: 1px solid #000; width: 200px; padding-top: 5px;">
          <strong>${data.employee_name}</strong>
        </div>
      </div>
    </div>
  </div>

  <div class="signature-section" style="margin-top: 40px;">
    <div style="text-align: right; margin-right: 60px;">
      <div class="signature-line" style="width: 200px; margin: 0 0 10px auto;">
        <div class="signature-title">POSLODAVAC</div>
        <div class="signature-title">VODITELJ ADMINISTRACIJE</div>
      </div>
    </div>
  </div>

  <div class="stamp">
    <div class="stamp-text">REPUBLIKA<br>HRVATSKA<br>MINISTARSTVO<br>UNUTARNJIH<br>POSLOVA</div>
  </div>
</div>

</body>
</html>
  `;
}
