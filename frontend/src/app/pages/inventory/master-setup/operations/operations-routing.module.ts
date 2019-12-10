import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPreloader } from 'src/app/app-routing-loader';
import { StoreListingComponent } from './store-listing/store-listing.component';
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard';
import { StoreOperationViewComponent } from './store-operation-view/store-operation-view.component';
import { OpenBalComponent } from './open-balance/open-bal/open-bal.component';
import { AddOpenBalComponent } from './open-balance/open-bal/add-open-bal/add-open-bal.component';
import { EditOpenBalComponent } from './open-balance/open-bal/edit-open-bal/edit-open-bal.component';
import { EditInvOpenBalanceResolver, EditinvtransferstoreResolver, EditRcvDocumentResolver, EditRcvTempResolver, EditRcvInspectionResolver, EditReqDocResolver, EditDispenseResolver, EditinvtransferRResolver, InvStockTakingResolver } from './operatins.resolve';
import { DipsDocComponent } from './dispence/disp-doc/disp-doc.component';
import { AddDipsDocComponent } from './dispence/disp-doc/add-disp-doc/add-disp-doc.component';
import { EditDipsDocComponent } from './dispence/disp-doc/edit-disp-doc/edit-disp-doc.component';
import { ReqDocComponent } from './req-document/req-doc/req-doc.component';
import { AddReqDocComponent } from './req-document/req-doc/add-req-doc/add-req-doc.component';
import { EditReqDocComponent } from './req-document/req-doc/edit-req-doc/edit-req-doc.component';
import { JOReqDocComponent } from './job-order-req-doc/jo-req-doc/jo-req-doc.component';
import { JOAddReqDocComponent } from './job-order-req-doc/jo-req-doc/add-jo-req-doc/add-jo-req-doc.component';
import { EditJOReqDocComponent } from './job-order-req-doc/jo-req-doc/edit-jo-req-doc/edit-jo-req-doc.component';
import { JODipsDocComponent } from './job-order-dispence/jo-disp-doc/jo-disp-doc.component';
import { AddJODipsDocComponent } from './job-order-dispence/jo-disp-doc/add-jo-disp-doc/add-jo-disp-doc.component';
import { EditJODipsDocComponent } from './job-order-dispence/jo-disp-doc/edit-jo-disp-doc/edit-jo-disp-doc.component';
import { ItemBalanceUnitsComponent } from './item-balance-units/item-balance-units.component';
import { RcvDocumentComponent } from './rcv-document/rcv-document/rcv-document.component';
import { AddRcvDocumentComponent } from './rcv-document/rcv-document/add-rcv-document/add-rcv-document.component';
import { EditRcvDocumentComponent } from './rcv-document/rcv-document/edit-rcv-document/edit-rcv-document.component';
import { RcvInspectionsComponent } from './rcv-inspection/rcv-inspection/rcv-inspection.component';
import { AddRcvInspectionComponent } from './rcv-inspection/rcv-inspection/add-rcv-inspection/add-rcv-inspection.component';
import { EditRcvInspectionComponent } from './rcv-inspection/rcv-inspection/edit-rcv-document/edit-rcv-inspection.component';
import { RcvTemporarysComponent } from './rcv-temporary/rcv-temporary/rcv-temporary.component';
import { AddRcvTemporaryComponent } from './rcv-temporary/rcv-temporary/add-rcv-temporary/add-rcv-temporary.component';
import { EditRcvTemporaryComponent } from './rcv-temporary/rcv-temporary/edit-rcv-temporary/edit-rcv-temporary.component';
import { TransfersComponent } from './transfers/transfers.component';
import { InvTransferRComponent } from './transfers/transferR/inv-transferR/inv-transferR.component';
import { AddInvTransferRComponent } from './transfers/transferR/inv-transferR/add-inv-transferR/add-inv-transferR.component';
import { EditInvTransferRComponent } from './transfers/transferR/inv-transferR/edit-inv-transferR/edit-inv-transferR.component';
import { InvTransferComponent } from './transfers/transfer/inv-transfer/inv-transfer.component';
import { AddInvTransferComponent } from './transfers/transfer/inv-transfer/add-inv-transfer/add-inv-transfer.component';
import { EditInvTransferComponent } from './transfers/transfer/inv-transfer/edit-inv-transfer/edit-inv-transfer.component';
import { InvStocktakingComponent } from './inv-stocktaking/inv-stocktaking.component';
import { AddInvStocktakingComponent } from './inv-stocktaking/add-inv-stocktaking/add-inv-stocktaking.component';
import { EditInvStocktakingComponent } from './inv-stocktaking/edit-inv-stocktaking/edit-inv-stocktaking.component';
import { InvStocktakingBalanceUComponent } from './inv-stocktaking/inv-stocktaking-balance-u/inv-stocktaking-balance-u.component';
import { TransferCustodyComponent } from './transfer-custody/transfer-custody.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { StoreBalanceComponent } from './purchase-request/store-balance/store-balance.component';
import { StoreBalDetailsComponent } from './purchase-request/store-balance/store-bal-details/store-bal-details.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { PurchaseRequestViewComponent } from './purchase-request/purchase-request-view/purchase-request-view.component';
import { DispenseTransactionsComponent } from './dispense-transactions/dispense-transactions.component';

const routes: Routes = [

    // {
    //     path: 'stores',
    //     component: StoreListingComponent,
    //     data: { key: 'stores', title: 'Operations' },
    //     canActivate: [AuthGuard],
    // },
    {
        path: 'operation',
        component: StoreOperationViewComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],   
    },
    {
        path: 'operation/open-balance',
        component: OpenBalComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/open-balance/add',
        component: AddOpenBalComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/open-balance/:INV_OPEN_BALANCE_ID',
        component: EditOpenBalComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            invOpenBalanceData: EditInvOpenBalanceResolver
        }
    },
    {
        path: 'operation/transfers',
        component: TransfersComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers/inv-transfer',
        component: InvTransferComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers/inv-transfer',
        component: InvTransferComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers/inv-transfer/add',
        component: AddInvTransferComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers/inv-transfer/:INV_TRANSFER_ID',
        component: EditInvTransferComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            invtransferstoreData: EditinvtransferstoreResolver
        },
    },
    {
        path: 'operation/transfers/inv-transfer-r',
        component: InvTransferRComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers/inv-transfer-r/add',
        component: AddInvTransferRComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers/inv-transfer-r/:INV_TRANSFER_R_ID',
        component: EditInvTransferRComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            invtransferstoreData: EditinvtransferRResolver
        },
    },
  
  
  
    {
        path: 'operation/transfers-custody',
        component: TransferCustodyComponent,
        data: { key: 'stores', title: 'Operations',isTransferCustody:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers-custody/inv-transfer',
        component: InvTransferComponent,
        data: { key: 'stores', title: 'Operations',isTransferCustody:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers-custody/inv-transfer',
        component: InvTransferComponent,
        data: { key: 'stores', title: 'Operations',isTransferCustody:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers-custody/inv-transfer/add',
        component: AddInvTransferComponent,
        data: { key: 'stores', title: 'Operations',isTransferCustody:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers-custody/inv-transfer/:INV_TRANSFER_ID',
        component: EditInvTransferComponent,
        data: { key: 'stores', title: 'Operations',isTransferCustody:true },
        canActivate: [AuthGuard],
        resolve: {
            invtransferstoreData: EditinvtransferstoreResolver
        },
    },
    {
        path: 'operation/transfers-custody/inv-transfer-r',
        component: InvTransferRComponent,
        data: { key: 'stores', title: 'Operations',isTransferCustody:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers-custody/inv-transfer-r/add',
        component: AddInvTransferRComponent,
        data: { key: 'stores', title: 'Operations',isTransferCustody:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/transfers-custody/inv-transfer-r/:INV_TRANSFER_R_ID',
        component: EditInvTransferRComponent,
        data: { key: 'stores', title: 'Operations',isTransferCustody:true },
        canActivate: [AuthGuard],
        resolve: {
            invtransferstoreData: EditinvtransferRResolver
        },
    },



    {
        path: 'operation/rcv-doc',
        component: RcvDocumentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/rcv-doc/add',
        component: AddRcvDocumentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/rcv-doc/:DOCUMENT_ID',
        component: EditRcvDocumentComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            rcvDocumentData: EditRcvDocumentResolver
        }
    },
    {
        path: 'operation/rcv-insp',
        component: RcvInspectionsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/rcv-insp/add',
        component: AddRcvInspectionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/rcv-insp/:DOCUMENT_ID',
        component: EditRcvInspectionComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            rcvDocumentData: EditRcvInspectionResolver
        }
    },
    {
        path: 'operation/rcv-temp',
        component: RcvTemporarysComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/rcv-temp/add',
        component: AddRcvTemporaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/rcv-temp/:DOCUMENT_ID',
        component: EditRcvTemporaryComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            rcvDocumentData: EditRcvTempResolver
        }
    },
    {
        path: 'operation/disp-doc',
        component: DipsDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/disp-doc/add',
        component: AddDipsDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/disp-doc/:DOCUMENT_ID',
        component: EditDipsDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            dispenceData: EditDispenseResolver
        }
    },
    {
        path: 'operation/dsp-txn/req-items-re',
        component: DipsDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/dsp-txn',
        component: DispenseTransactionsComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/dsp-txn/req-items-re/:DOCUMENT_ID',
        component: EditDipsDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            dispenceData: EditDispenseResolver
        }
    },
    {
        path: 'operation/job-order-disp',
        component: JODipsDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/job-order-disp/add',
        component: AddJODipsDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/job-order-disp/:DOCUMENT_ID',
        component: EditJODipsDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            dispenceData: EditDispenseResolver
        }
    },
    {
        path: 'operation/req-doc',
        component: ReqDocComponent,
        data: { key: 'stores', title: 'Operations', isReturnRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/req-doc/add',
        component: AddReqDocComponent,
         data: { key: 'stores', title: 'Operations', isReturnRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/req-doc/:DOCUMENT_ID',
        component: EditReqDocComponent,
         data: { key: 'stores', title: 'Operations', isReturnRequest:true },
        canActivate: [AuthGuard],
        resolve: {
            reqDocData: EditReqDocResolver
        }
    },
    {
        path: 'operation/dsp-txn/req-items',
        component: ReqDocComponent,
        data: { key: 'stores', title: 'Operations', isRequestItems:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/dsp-txn/req-items/add',
        component: AddReqDocComponent,
         data: { key: 'stores', title: 'Operations', isRequestItems:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/dsp-txn/req-items/:DOCUMENT_ID',
        component: EditReqDocComponent,
         data: { key: 'stores', title: 'Operations', isRequestItems:true },
        canActivate: [AuthGuard],
        resolve: {
            reqDocData: EditReqDocResolver
        }
    },
    {
        path: 'operation/job-order-req',
        component: JOReqDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/job-order-req/add',
        component: JOAddReqDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/job-order-req/:DOCUMENT_ID',
        component: EditJOReqDocComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve: {
            reqDocData: EditReqDocResolver
        }
    },
    {
        path: 'operation/item-balance',
        component: ItemBalanceUnitsComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },

    {
        path: 'operation/stock-taking',
        component: InvStocktakingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/stock-taking/add',
        component: AddInvStocktakingComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/stock-taking/:INV_STOCKTAKING_ID',
        component: EditInvStocktakingComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve:{
            invStockTakingData:InvStockTakingResolver
        }
    },
    {
        path: 'operation/stock-taking/:INV_STOCKTAKING_ID/balance',
        component: InvStocktakingBalanceUComponent,
        data: { key: 'stores', title: 'Operations' },
        canActivate: [AuthGuard],
        resolve:{
            invStockTakingData:InvStockTakingResolver
        }
    },

    {
        path: 'operation/req-item-return',
        component: ReqDocComponent,
        data: { key: 'stores', title: 'Operations', isItemReturnRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/req-item-return/add',
        component: AddReqDocComponent,
        data: { key: 'stores', title: 'Operations', isItemReturnRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/req-item-return/:DOCUMENT_ID',
        component: EditReqDocComponent,
        data: { key: 'stores', title: 'Operations', isItemReturnRequest:true },
        canActivate: [AuthGuard],
        resolve: {
            reqDocData: EditReqDocResolver
        }
    },
    {
        path: 'operation/req-emp-custody',
        component: ReqDocComponent,
        data: { key: 'stores', title: 'Operations', isEmployeeCustodyRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/req-emp-custody/add',
        component: AddReqDocComponent,
        data: { key: 'stores', title: 'Operations', isEmployeeCustodyRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/req-emp-custody/:DOCUMENT_ID',
        component: EditReqDocComponent,
        data: { key: 'stores', title: 'Operations', isEmployeeCustodyRequest:true },
        canActivate: [AuthGuard],
        resolve: {
            reqDocData: EditReqDocResolver
        }
    },
    {
        path: 'operation/req-item-lost',
        component: ReqDocComponent,
        data: { key: 'stores', title: 'Operations', isItemLostRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/req-item-lost/add',
        component: AddReqDocComponent,
        data: { key: 'stores', title: 'Operations', isItemLostRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/req-item-lost/:DOCUMENT_ID',
        component: EditReqDocComponent,
        data: { key: 'stores', title: 'Operations', isItemLostRequest:true },
        canActivate: [AuthGuard],
        resolve: {
            reqDocData: EditReqDocResolver
        }
    },

    {
        path: 'operation/transactions',
        component: TransactionsComponent,
        data: { key: 'stores', title: 'Operations', isItemLostRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/purchase',
        component: PurchaseRequestComponent,
        data: { key: 'stores', title: 'Operations', isItemLostRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/purchase/pur-req',
        component: StoreBalanceComponent,
        data: { key: 'stores', title: 'Operations', isItemLostRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/purchase/pur-req/:STORES_ID',
        component: StoreBalDetailsComponent,
        data: { key: 'stores', title: 'Operations', isItemLostRequest:true },
        canActivate: [AuthGuard]
    },
    {
        path: 'operation/purchase/pur-req-view',
        component: PurchaseRequestViewComponent,
        data: { key: 'stores', title: 'Operations'},
        canActivate: [AuthGuard]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    providers: [AppPreloader],
    declarations: [],
    exports: [RouterModule],
    entryComponents:[]
})
export class OperationsRoutingModule { }
