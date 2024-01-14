import { faEdit, faFilter, faPlus, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from 'components/Datatables/Table'
import TableCell from './TableCell';
import PrimaryIconButton from 'components/Button/PrimaryIconButton';
import TableLoading from "components/Datatables/TableLoading";
import React, { useState } from 'react';
import DynamicFormSection from 'components/Form/DynamicFormSection';
import Paginate from './Paginate';
import Dialog from 'components/Dialog/Dialog';
import DynamicFilter from 'components/Form/DynamicFilter';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from "framer-motion";

export default function WrapedTable({ loading, setLoading, filterFields, dataHeader, data, handleDelete, handleSubmitForm, onSubmitSuccess }) {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const { t } = useTranslation('common');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowCount, setRowCount] = useState(10);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteParam, setDeleteParam] = useState([]);
    const [showForm, setShowForm] = useState('');
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
  
    const {filteredRows, totalFilteredPages} = handleFilter(null, data, rowCount);
    console.log(filteredRows,'filteredRowssssss');
    const firstRowIndex = (currentPage - 1) * rowCount;
    const lastRowIndex = firstRowIndex + rowCount; 
    const rowsToDisplay = filteredRows.slice(firstRowIndex, lastRowIndex);
    const onRowCountChange = (newRowCount) => {
      setRowCount(newRowCount);
      setCurrentPage(1);
    };
    function handleFilter(formdata, dataOfTable=data, rowCount){
      // var i = 0
        const filteredRows = formdata && dataOfTable
        ?
         dataOfTable.filter(row => {
            // Implement filtering logic based on the 'formdata' object
            const dataKeys = Array.from(Object.keys(formdata));
            console.log( Array.from(dataKeys), '12345');
            let isMatching = true;
            for ( var hh = 0; hh < dataKeys.length; hh++) {
                const key = dataKeys[hh];
                // alert(hh);
                if (row[key] !== formdata[key]) {
                  isMatching = false;
                  break; // Exit the loop if a mismatch is found
                }
            }
            
            if (!isMatching) {
              return false; // If a mismatch is found, return false
            }
          })
        :
        dataOfTable;
      
        const totalFilteredPages = Math.ceil(filteredRows.length / rowCount);
      
        return {
          filteredRows,
          totalFilteredPages
        };
     
    }
    function handleShowCreateForm(){
      if(showForm !== 'create') setShowForm('create')
      else setShowForm('')
    }
    function handleShowFilterForm(){
      if(showForm !== 'filter') setShowForm('filter')
      else setShowForm('')
    }
  return (
    <>
    <header className='flex flex-row gap-3 mb-4'>
      <span className='flex-1'></span>
      <span className=''>
        <PrimaryIconButton selected={showForm === 'create' ? true : false} icon={<FontAwesomeIcon icon={faPlus}/>} onClick={handleShowCreateForm}>{t('create')}</PrimaryIconButton>
      </span>
      <span>
        <PrimaryIconButton selected={showForm === 'filter' ? true : false} icon={<FontAwesomeIcon icon={faFilter}/>} onClick={handleShowFilterForm}>{t('filter')}</PrimaryIconButton>
      </span>
    </header>
    <AnimatePresence>
      <motion.div
        key={showForm}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: 'auto',
          transition: { duration: 0.5 } // Adding a delay of 0.2 seconds
        }}
        // exit={{opacity:0, height: 0, transition:{duration: 0.5}}}
      >
        {
        showForm==='filter' && filterFields
        ? 
          <DynamicFilter 
            formFields={filterFields} 
            handleSubmitFilter={handleFilter} 
            setShowForm={setShowForm} 
            t={t}
          />
        :
        showForm==='create' 
        ?
          <DynamicFormSection 
            formFields={dataHeader} 
            handleSubmitForm={handleSubmitForm} 
            setTableLoading={setLoading} 
            selectedRowData={selectedRowData} 
            setSelectedRowData={setSelectedRowData} 
            onSubmitSuccess={onSubmitSuccess}
          />
        :
        ''
        }
      </motion.div>
  </AnimatePresence>
        
        {
        !loading && 
        <div>
          <Table loading={loading} dataHeader={dataHeader} actionBox={true}>
            {
              rowsToDisplay && 
              rowsToDisplay.map((row, index) => 

                    <Componen
                      key={index}
                      deleteRow={deleteRow}
                      fields={dataHeader}
                      row={row}
                      setSelectedRowData={setSelectedRowData}
                    />
                  
                )
            }
            {
              !data && !loading && 
              <p className=''>{t('noDataFound')}</p>
            }
          </Table>
        </div>
          
        }
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
}
const Componen = React.forwardRef((props, ref) => (
    <tr
        ref={ref}
        className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
      >
        
        {props.fields.map((field,index)=>(

            <TableCell dataLabel={field.label} showLabel={true} className={' md:max-w-xs overflow-x-hidden'}>
                <p className="font-normal text-sm text-gray-500 md:whitespace-pre-wrap">{props.row[field.key]}</p>
            </TableCell>
        ))}
        <TableCell dataLabel='Action' showLabel={true} className={' md:max-w-xs'}>
            <button
                onClick={()=>{
                // setShowForm(true)
                props.setSelectedRowData(props.row)
                }}
                className={`text-sky-700 inline-flex py-2 px-2 rounded hover:bg-slate-300 hover:bg-opacity-30  text-sm`}
            >
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
                onClick={(e) => {
                  props.deleteRow(props.row.id);
                }}
                className={`text-red-700 inline-flex py-2 px-2 rounded hover:bg-slate-300 hover:bg-opacity-30  text-sm`}
            >
                <FontAwesomeIcon icon={faRemove} />
            </button>
        </TableCell>
      </tr>
))
function TableRow({fields, row, setSelectedRowData, deleteRow}) {
    return(
        <tr
            className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
          >
            
            {fields.map((field,index)=>(

                <TableCell dataLabel={field.label} showLabel={true} className={' md:max-w-xs overflow-x-hidden'}>
                    <p className="font-normal text-sm text-gray-500 md:whitespace-pre-wrap">{row[field.key]}</p>
                </TableCell>
            ))}
            <TableCell dataLabel='Action' showLabel={true} className={' md:max-w-xs'}>
                <button
                    onClick={()=>{
                    // setShowForm(true)
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
                    className={`text-red-700 inline-flex py-2 px-2 rounded hover:bg-slate-300 hover:bg-opacity-30  text-sm`}
                >
                    <FontAwesomeIcon icon={faRemove} />
                </button>
            </TableCell>
        </tr>
    )
}
// function applyFilterseee(data, categoryFilter, statusFilter, searchQuery, rowCount) {
//     const filteredRows = data.filter((row) => {
//      const matchesCategory = categoryFilter === "" || row.categoryId.toString() === categoryFilter;
//      const matchesStatus = statusFilter === "" || row.productStatus.toString() === statusFilter;
//      const matchesSearch = searchQuery === "" || 
//        row.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//        row.productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
//        row.keySearch.toLowerCase().includes(searchQuery.toLowerCase());
     
//      return matchesCategory && matchesStatus && matchesSearch;
//    });
//    return {
//      filteredRows,
//      totalFilteredPages: Math.ceil(filteredRows.length / rowCount),
     
//    };
//  }
 
