import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintForm = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [printData, setPrintData] = useState<any[]>([]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const quantity = parseInt(formData.get('quantity') as string, 10);

    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      mobileNumber: formData.get('mobileNumber'),
      location: formData.get('location'),
    };

    const newData = Array.from({ length: quantity }, (_, i) => ({ ...data, srNo: i + 1 }));
    setPrintData(newData);
    handlePrint();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Mobile Number:
          <input type="tel" name="mobileNumber" required />
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="location" required />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" name="quantity" required />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
      <div style={{ visibility: 'hidden' }}>
        <div ref={componentRef}>
          {printData.map((data, index) => (
            <div key={index} style={{pageBreakAfter: 'always'}}>
              <h2>Page {index + 1}</h2>
              <p>
                <strong>Full Name:</strong> {data.fullName}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Mobile Number:</strong> {data.mobileNumber}
              </p>
              <p>
                <strong>Location:</strong> {data.location}
              </p>
              <p>
                <strong>Sr. No:</strong> {data.srNo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintForm;
