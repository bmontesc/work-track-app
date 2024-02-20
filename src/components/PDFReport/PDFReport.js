import { jsPDF } from 'jspdf';

const generatePDF = (tasks, employee, company) => {
  const doc = new jsPDF();
  let headers;
  let columnWidths;
  if (employee) {headers = ['Fecha', 'Bloq.','Prio.', 'N', 'Empresa', 'XD', 'Sit', 'TE', 'TI', 'TP',  'Salida']; columnWidths = [20, 10, 10, 10, 30, 10, 10, 20, 20, 20, 20];}
  if (company) {headers = ['Fecha', 'Bloq.','Prio.', 'XD', 'Sit.', 'Con.', 'TE', 'TI', 'TP',  'Salida']; columnWidths = [20, 10, 10, 10, 30, 20, 20, 20, 20, 20];}
  const headerStyle = { fillColor: "#00529b", textColor: "#ffffff" };
  const rowStyle = { fillColor: "#f2f2f2" };
  const titleColor = ["#7bc5fe","#a5e587","#ffd37d","#f99596"]
  const pageHeight = doc.internal.pageSize.height; 

  doc.setFont("helvetica", "bold");
  doc.setTextColor("#000000");
  doc.setFontSize(16);
  if (employee) doc.text(`Informe de tareas del empleado: ${employee}`, 15, 20);
  if (company) doc.text(`Informe de tareas de la empresa: ${company}`, 15, 20);
  let y=15;
  let x=30;

  tasks.forEach((task, index) => {
      let task_type = task.type === 'extracts' 
                                    ? 'Extractos' 
                                    : (task.type === 'vat' ? 'IVA'
                                    : (task.type === 'fixed assets' ? 'Inmovilizado'
                                    : 'Contable' ))
      let data;
      if (employee) data = task.tasks.map(taskLine => [taskLine.date, '', taskLine.priority, taskLine.company_number, taskLine.company_name, '', taskLine.status, taskLine.estimated_time, taskLine.used_time, taskLine.diference, taskLine.finish_date ]);
      if (company) data = task.tasks.map(taskLine => [taskLine.date, '', taskLine.priority, '', taskLine.status, taskLine.accountant_code === undefined ? '' : taskLine.accountant_code, taskLine.estimated_time, taskLine.used_time, taskLine.diference, taskLine.finish_date ]);

      doc.setFillColor(titleColor[index]);
      doc.setTextColor("#000000");
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.roundedRect(y, x, 180, 10, 3, 3, "F");
      const cellTextWidth = doc.getStringUnitWidth(task_type) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const xOffset = (180 - cellTextWidth) / 2;
      doc.text(task_type, y+xOffset, x+7)
      x += 15
        
      if (task.tasks.length > 0) {
        headers.forEach((header, index) => {
          doc.setFillColor(headerStyle.fillColor);
          doc.setTextColor(headerStyle.textColor);
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          doc.rect(y, x, columnWidths[index], 8, "F");
          const cellWidth = columnWidths[index];
          const cellTextWidth = doc.getStringUnitWidth(header) * doc.internal.getFontSize() / doc.internal.scaleFactor;
          const xOffset = (cellWidth - cellTextWidth) / 2;
          doc.text(header, y + xOffset, x + 5);
          y += columnWidths[index];
        });
        x += 8;
        y=15
        
        // Draw the table rows
        data.forEach((row) => {
          row.forEach((cell, index) => {
            doc.setFillColor(rowStyle.fillColor);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");


            if (x + 25 > pageHeight) {
              doc.addPage();
              x = 15;
              headers.forEach((header, index) => {
                doc.setFillColor(headerStyle.fillColor);
                doc.setTextColor(headerStyle.textColor);
                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.rect(y, x, columnWidths[index], 8, "F");
                const cellWidth = columnWidths[index];
                const cellTextWidth = doc.getStringUnitWidth(header) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                const xOffset = (cellWidth - cellTextWidth) / 2;
                doc.text(header, y + xOffset, x + 5);
                y += columnWidths[index];
              });
              x += 8;
              y=15
              
              doc.setFillColor(rowStyle.fillColor);
              doc.setTextColor(0, 0, 0);
              doc.setFontSize(8);
              doc.setFont("helvetica", "normal");
            }

            doc.rect(y, x, columnWidths[index], 8, "F");
            const cellWidth = columnWidths[index];
            const cellTextWidth = doc.getStringUnitWidth(cell.toString()) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const xOffset = (cellWidth - cellTextWidth) / 2;
            doc.text(cell.toString(), y + xOffset, x + 5);
            y += columnWidths[index];
          });
          y = 15;
          x += 8;
        });
      } else {
        doc.text('No hay tareas', y, x+5)
      }
      x += 10
      if (x + 25 > pageHeight) {
        doc.addPage();
        x = 15;
      }
  });
  if (employee) doc.save(`INFORME_EMPLEADO_${employee.split(' ')[0]}_${employee.split(' ')[1]}.pdf`);
  if (company) doc.save(`INFORME_EMPRESA_${company}.pdf`);

}
export default generatePDF;