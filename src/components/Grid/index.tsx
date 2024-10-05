'use client'

import { themeQuartz } from '@ag-grid-community/theming'
import { type ColDef, type ICellRendererParams } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useEffect, useState } from 'react'

import CreateModal from '@/components/Modals/Create'
import { Button } from '@/components/ui/button'
import { type Company, type Contact, useGetEntitiesQuery } from '@/types/graphql'

// TODO: create dialog component's for updating entries
// TODO: write inline documentation

const myTheme = themeQuartz
  .withParams({
    backgroundColor: '#1f2836',
    browserColorScheme: 'inherit',
    chromeBackgroundColor: {
      ref: 'foregroundColor',
      mix: 0.07,
      onto: 'backgroundColor'
    },
    foregroundColor: '#FFFFFF',
    headerFontSize: 14,
    spacing: '4px',
    rowVerticalPaddingScale: 3,
    cellHorizontalPaddingScale: 2
  })

const Grid = () => {
  const { loading, error, data } = useGetEntitiesQuery()

  const [rowData, setRowData] = useState<Array<Contact | Company>>()

  const CellButton = (params: ICellRendererParams) => {
    const onClick = () => {
      console.log(params.data)
    }

    return (
      <div className='w-full h-full flex items-center'>
        <Button onClick={onClick} variant='secondary'>click me</Button>
      </div>
    )
  }

  useEffect(() => {
    const arr: Array<Contact | Company> = []

    data?.getEntities?.forEach((entity) => {
      if (entity?.__typename === 'Company') {
        arr.push({
          ...entity
        })
      }
      if (entity?.__typename === 'Contact') {
        arr.push({
          ...entity
        })
      }
    })

    setRowData(arr)
  }, [data])

  const [colDefs] = useState<ColDef[]>([
    { field: 'id', hide: true },
    { field: 'name', flex: 1 },
    { field: 'email', flex: 1 },
    { field: 'phone', flex: 1 },
    { field: 'industry', flex: 1 },
    { field: 'contactEmail', flex: 1 },
    { field: 'edit', cellRenderer: CellButton, flex: 1 }
  ])

  if (loading) return <span className='text-white'>Loading...</span>
  if (error) return <span className='text-white'>Error: {error.message}</span>

  return (
    <div
      className='flex flex-col gap-4 h-full w-full p-8 mx-auto max-w-[1440px]'
    >
      <CreateModal />
      <AgGridReact
        theme={myTheme}
        rowData={rowData}
        columnDefs={colDefs}
        autoSizeStrategy={{
          type: 'fitCellContents'
        }}
      />
    </div>
  )
}
export default Grid
