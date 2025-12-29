import React from 'react';
import { DocumentData, ArticleControl } from '../types';
import { AlertTriangle } from 'lucide-react';

interface DocumentProps {
  title: string;
  data: DocumentData;
  type: 'PO' | 'DN';
  controls?: Record<number, ArticleControl>;
  onToggleControl?: (index: number, field: keyof ArticleControl) => void;
  onSetExpectedQuantity?: (index: number, qty: number) => void;
  onToggleConditionError?: () => void;
  conditionError?: boolean;
}

const Document: React.FC<DocumentProps> = ({ 
  title, 
  data, 
  type, 
  controls, 
  onToggleControl, 
  onSetExpectedQuantity,
  onToggleConditionError,
  conditionError
}) => {
  const isDN = type === 'DN';

  return (
    <div className="bg-white p-6 sm:p-8 shadow-2xl border border-gray-200 text-[10px] sm:text-xs w-full max-w-2xl mx-auto font-serif leading-tight relative overflow-hidden rounded-sm">
      {/* Filigrane discret */}
      {type === 'PO' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 text-slate-100 text-7xl font-black pointer-events-none uppercase">
          COMMANDE
        </div>
      )}

      {/* En-tête */}
      <div className="flex justify-between items-start mb-6 border-b pb-4 relative z-10">
        <div className="max-w-[60%]">
          <h2 className="font-bold text-sm text-blue-800 uppercase leading-none mb-1">{data.vendor.name}</h2>
          <p className="text-gray-600">{data.vendor.address}</p>
          <p className="text-gray-400 italic text-[8px] mt-1">{data.vendor.details}</p>
        </div>
        <div className="text-right">
          <h1 className="font-black text-base uppercase tracking-widest text-slate-800">{title}</h1>
          <p className="font-bold text-blue-600 mt-1">N° {data.id}</p>
          <p className="text-gray-500">Date : {data.date}</p>
        </div>
      </div>

      {/* Destinataire */}
      <div className="flex justify-end mb-8 relative z-10">
        <div className="w-1/2 p-3 border-l-4 border-slate-800 bg-slate-50 rounded-r shadow-sm">
          <p className="text-[7px] text-gray-400 font-bold uppercase mb-1">Livré à :</p>
          <p className="font-black text-slate-900">{data.buyer.name}</p>
          <p className="text-slate-600">{data.buyer.address}</p>
        </div>
      </div>

      {/* Infos de Livraison */}
      {isDN && (
        <div className="mb-4 text-blue-900 font-bold bg-blue-50/50 p-2 rounded border border-blue-100 flex justify-between items-center text-[9px]">
          <span>Réf. Commande : {data.orderRef} - {data.parcelCount} colis reçus</span>
        </div>
      )}

      {/* Tableau des articles */}
      <table className="w-full mb-6 border-collapse relative z-10">
        <thead>
          <tr className="bg-slate-800 text-white text-left uppercase text-[8px] tracking-widest">
            <th className="p-2 border border-slate-700">Réf</th>
            <th className="p-2 border border-slate-700">Désignation</th>
            <th className="p-2 border border-slate-700 text-center">Qté</th>
            {type === 'PO' && <th className="p-2 border border-slate-700 text-right">P.U.</th>}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.items.map((item, idx) => {
            const ctrl = controls?.[idx];
            const hasError = ctrl?.refError || ctrl?.designationError || ctrl?.quantityError;
            return (
              <tr key={idx} className={`border-b border-slate-200 transition-colors ${hasError ? 'bg-red-50' : ''}`}>
                <td className="p-2 font-mono">
                  <div className="flex items-center gap-1">
                    {item.ref}
                    {isDN && onToggleControl && (
                      <button onClick={() => onToggleControl(idx, 'refError')} className={`p-1 rounded ${ctrl?.refError ? 'bg-red-600 text-white' : 'text-slate-200 hover:text-red-400'}`}>
                        <AlertTriangle size={10} />
                      </button>
                    )}
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{item.designation}</span>
                    {isDN && onToggleControl && (
                      <button onClick={() => onToggleControl(idx, 'designationError')} className={`p-1 rounded ${ctrl?.designationError ? 'bg-red-600 text-white' : 'text-slate-200 hover:text-red-400'}`}>
                        <AlertTriangle size={10} />
                      </button>
                    )}
                  </div>
                </td>
                <td className="p-2 text-center font-bold">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      {item.quantity}
                      {isDN && onToggleControl && (
                        <button onClick={() => onToggleControl(idx, 'quantityError')} className={`p-1 rounded ${ctrl?.quantityError ? 'bg-red-600 text-white' : 'text-slate-200 hover:text-red-400'}`}>
                          <AlertTriangle size={10} />
                        </button>
                      )}
                    </div>
                    {isDN && ctrl?.quantityError && onSetExpectedQuantity && (
                      <input 
                        type="number" 
                        placeholder="Reçu?"
                        className="w-12 p-1 text-[8px] border border-red-300 rounded text-center focus:ring-1 focus:ring-red-500 outline-none font-mono"
                        value={ctrl.expectedQuantity || ''}
                        onChange={(e) => onSetExpectedQuantity(idx, parseInt(e.target.value))}
                      />
                    )}
                  </div>
                </td>
                {type === 'PO' && <td className="p-2 text-right font-mono">{item.pu?.toFixed(2)} €</td>}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Conditions et Signature */}
      <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
        <div className={`border-t border-slate-200 pt-2 italic text-gray-600 text-[9px] ${conditionError ? 'bg-red-50' : ''}`}>
          <div className="flex items-center justify-between mb-1">
            <p className="font-black not-italic text-slate-800 text-[8px] uppercase">Conditions :</p>
            {isDN && onToggleConditionError && (
              <button onClick={onToggleConditionError} className={`p-1 rounded ${conditionError ? 'bg-red-600 text-white' : 'text-slate-200 hover:text-red-400'}`}>
                <AlertTriangle size={10} />
              </button>
            )}
          </div>
          {data.conditions}
        </div>
        {isDN && (
          <div className="border border-dashed border-gray-400 p-3 min-h-[60px] flex flex-col justify-between">
            <p className="text-[7px] font-bold text-gray-300 uppercase tracking-tight">Visa Réceptionnaire</p>
            <div className="w-full border-b border-gray-200 mt-auto opacity-50"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;