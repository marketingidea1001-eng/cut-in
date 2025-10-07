import React, { useState } from 'react';
import { Camera, Upload, Save, FileText, CheckCircle } from 'lucide-react';

const BarberDocuments = () => {
  const [documents, setDocuments] = useState({
    license: null,
    certificate: null,
    healthCard: null,
    idCard: null
  });

  const [previews, setPreviews] = useState({});

  const handleFileUpload = (docType, file) => {
    setDocuments({ ...documents, [docType]: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews({ ...previews, [docType]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(documents).forEach(key => {
      if (documents[key]) formData.append(key, documents[key]);
    });
    // Submit logic here
    console.log('Documents submitted');
  };

  const documentTypes = [
    { id: 'license', label: 'Barber License', required: true },
    { id: 'certificate', label: 'Professional Certificate', required: true },
    { id: 'healthCard', label: 'Health Card', required: true },
    { id: 'idCard', label: 'ID Card', required: true }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Barber Documents</h2>
        <p className="text-gray-600">Upload required professional documents</p>
      </div>

      <div className="space-y-6">
        {documentTypes.map((doc) => (
          <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">{doc.label}</h3>
                {doc.required && <span className="ml-2 text-red-500">*</span>}
              </div>
              {documents[doc.id] && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex-1">
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                  {previews[doc.id] ? (
                    <img src={previews[doc.id]} alt={doc.label} className="h-full object-contain" />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Click to upload</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileUpload(doc.id, e.target.files[0])}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Documents
        </button>
      </div>
    </div>
  );
};

export default BarberDocuments;
