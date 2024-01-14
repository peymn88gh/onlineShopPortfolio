import React, { memo, useMemo, useState } from "react";
import Datatables from "components/Datatables/Table";
import TableCell from "components/Datatables/TableCell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPencil, faPlus, faRemove, faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import PrimaryIconButton from "components/Button/PrimaryIconButton";
import SecondaryButton from "components/Button/SecondaryButton";
import Input from "components/Input/Input";
import TableLoading from "components/Datatables/TableLoading";
import Paginate from "components/Datatables/Paginate";
import Dialog from "components/Dialog/Dialog";
import DynamicFormSection from "components/Form/DynamicFormSection";


const AddressTable = memo(({ loading, setLoading, handleSubmitForm, dataHeader, data, handleDelete, countryList, formFields }) => {


  const AddresType = [ 'None', 'Default', 'ShipFrom', 'ShipTo', 'Private', 'Business' ]
  const {t, i18n} = useTranslation('common')
  const [countryFilter, setCountryFilter] = useState("");
  const [addressTypeFilter, setAddressTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowCount, setRowCount] = useState(10);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteParam, setDeleteParam] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const handleShowDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const deleteRow  = (rowId) => {
    setDeleteParam([rowId]);
    handleShowDeleteDialog();
  }

  const rowsPerPageOptions = [{value:'10', label:'10'},{value:'20', label:'20'},{value:'50', label:'50'}];

  const {filteredRows, totalFilteredPages} = applyFilters(data, countryFilter, addressTypeFilter, searchQuery, rowCount);
  const firstRowIndex = (currentPage - 1) * rowCount;
  const lastRowIndex = firstRowIndex + rowCount; 
  const rowsToDisplay = filteredRows.slice(firstRowIndex, lastRowIndex);

  const onRowCountChange = (newRowCount) => {
    setRowCount(newRowCount);
    setCurrentPage(1);
  };


  return (
    <>
    {!showForm && <div className="mb-4 flex items-center justify-between flex-wrap">
      <div className="mb-4 flex gap-4">
        <Input
          label="Search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<FontAwesomeIcon icon={faSearch} />}
        />
        <Input
          label="country"
          type="select"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          options={countryList}

        />
        <Input
          label="address type"
          type="select"
          value={addressTypeFilter}
          onChange={(e) => setAddressTypeFilter(e.target.value)}
          options={AddresType.map((ele, i)=>{return {label:ele,key:i, value:i}})}
          
        />
        <SecondaryButton
          onClick={()=>{
            setCountryFilter('')
            setSearchQuery('')
            setAddressTypeFilter('')
          }}
          icon={<FontAwesomeIcon className="mx-1" icon={faUndo}/>}
        >
          reset values</SecondaryButton>
      </div>
      <PrimaryIconButton icon={<FontAwesomeIcon icon={faPlus}/>} onClick={()=>{setShowForm(true)}}>create new</PrimaryIconButton>
    </div>}
    {showForm && <DynamicFormSection formFields={formFields} t={t} handleSubmitForm={handleSubmitForm} setTableLoading={setLoading} selectedRowData={selectedRowData} setSelectedRowData={setSelectedRowData} setShowForm={setShowForm}/>}
    {!loading && <Datatables loading={loading} dataHeader={dataHeader}>
      {rowsToDisplay?.map((row, index) => (
        <tr
          key={index}
          className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
        >
          <TableCell dataLabel="adresseType" showLabel={true}>
            <span className="font-medium text-sm text-gray-900">
              {AddresType[row.adresseType]}
            </span>
          </TableCell>
          <TableCell dataLabel="country" showLabel={true}>
            <span className={`fi fi-${countryList[row.countryId].key.toLowerCase()}`}></span><p className="ml-2 inline font-normal text-sm text-gray-500">{countryList[row.countryId].label}</p>
          </TableCell>
          <TableCell dataLabel="city" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.city}</p>
          </TableCell>
          <TableCell dataLabel="street" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.street}</p>
          </TableCell>
          <TableCell dataLabel="zipCode" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.zipCode}</p>
          </TableCell>
          <TableCell dataLabel="valid From" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.validFrom ? format(new Date(row.validFrom),'PP') : ''}</p>
          </TableCell>
          <TableCell dataLabel="valid To" showLabel={true}>
            <p className="font-normal text-sm text-gray-500">{row.validTo ? format(new Date(row.validTo),'PP') : ''}</p>
          </TableCell>
         
          <TableCell>
              <button
                onClick={()=>{
                  setShowForm(true)
                  setSelectedRowData(row)
                }}
                className={`text-sky-700 inline-flex py-2 px-2 rounded hover:bg-slate-300 hover:bg-opacity-30  text-sm`}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={(e) => {
                  deleteRow(row.id);
                }}
                className={`text-red-700 inline-flex py-2 px-2 mx-1 rounded hover:bg-slate-300 hover:bg-opacity-30  text-sm`}
              >
                <FontAwesomeIcon icon={faRemove} />
              </button>
            </TableCell>
        </tr>
      ))}
    </Datatables>}
    {loading && <TableLoading />}
      <Paginate
        countedResults={filteredRows.length}
        currentPage={currentPage}
        totalPages={totalFilteredPages}
        onPageChange={setCurrentPage}
        rowCountOptions={rowsPerPageOptions}
        selectedRowCount={rowCount}
        onRowCountChange={onRowCountChange}
      />
      <Dialog
        isOpen={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        params={deleteParam}
        title="Delete Confirmation"
        content="Are you sure you want to delete this records?"
        
      />
    </>
  );
});

export default AddressTable;

function applyFilters(data, countryFilter, addressTypeFilter, searchQuery, rowCount) {
  const filteredRows = data.filter((row) => {
     const matchesCountry= countryFilter === "" || row.countryId.toString() === countryFilter;
     const matchesAddressType = addressTypeFilter === "" || row.adresseType.toString() === addressTypeFilter;
     const matchesSearch = searchQuery === "" || 
       row.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
       row.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
       row.zipCode.toLowerCase().includes(searchQuery.toLowerCase());
     
     return matchesCountry && matchesAddressType && matchesSearch;
   });
   return {
     filteredRows,
     totalFilteredPages: Math.ceil(filteredRows.length / rowCount),
     
   };
 }
// {
//     "id": 0,
//     "status": 0,
//     "adresseType": "None",
//     "street": "string",
//     "city": "string",
//     "countryId": 0,
//     "zipCode": "string",
//     "validFrom": "2023-08-22T16:17:57.477Z",
//     "validTo": "2023-08-22T16:17:57.477Z",
//     "accountId": 0,
//     "userId": 0
//   }