import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartistModule } from 'ng-chartist';
import { OperationsRoutingModule } from './operations-routing.module';
import { StoreListingComponent } from './store-listing/store-listing.component';
import { StoreOperationViewComponent } from './store-operation-view/store-operation-view.component';
import { OpenBalComponent } from './open-balance/open-bal/open-bal.component';
import { OpenBalItemsDetailsFormComponent } from './open-balance/open-bal-items-details/open-bal-items-details-form/open-bal-items-details-form.component';
import { OpenBalItemsFormComponent } from './open-balance/open-bal-items/open-bal-items-form/open-bal-items-form.component';
import { AddOpenBalComponent } from './open-balance/open-bal/add-open-bal/add-open-bal.component';
import { EditOpenBalComponent } from './open-balance/open-bal/edit-open-bal/edit-open-bal.component';
import { OpenBalFormComponent } from './open-balance/open-bal/open-bal-form/open-bal-form.component';
import { EditInvOpenBalanceResolver, EditRcvDocumentResolver, EditinvtransferstoreResolver, EditRcvInspectionResolver, EditRcvTempResolver, EditInvOpenBalanceItemsResolver, EditInvOpenBalanceItemsDetailsResolver, EditReqDocResolver, EditDispenseResolver, EditinvtransferRResolver, InvStockTakingResolver } from './operatins.resolve';
import { CustomSearchModule } from 'src/app/lib/custom-search-popup/custom-search.module';
import { DipsDocComponent } from './dispence/disp-doc/disp-doc.component';
import { DipsDocItemsDetailsFormComponent } from './dispence/disp-doc-items-details/disp-doc-items-details-form/disp-doc-items-details-form.component';
import { DipsDocItemsFormComponent } from './dispence/disp-doc-items/disp-doc-items-form/disp-doc-items-form.component';
import { AddDipsDocComponent } from './dispence/disp-doc/add-disp-doc/add-disp-doc.component';
import { EditDipsDocComponent } from './dispence/disp-doc/edit-disp-doc/edit-disp-doc.component';
import { DipsDocFormComponent } from './dispence/disp-doc/disp-doc-form/disp-doc-form.component';
import { DipsDocItemsTableComponent } from './dispence/disp-doc-items/disp-doc-items-table/disp-doc-items-table.component';
import { DipsDocItemsDetailsTableComponent } from './dispence/disp-doc-items-details/disp-doc-items-details-table/disp-doc-items-details-table.component';
import { ReqDocComponent } from './req-document/req-doc/req-doc.component';
import { ReqDocItemsDetailsFormComponent } from './req-document/req-doc-items-details/req-doc-items-details-form/req-doc-items-details-form.component';
import { ReqDocItemsFormComponent } from './req-document/req-doc-items/req-doc-items-form/req-doc-items-form.component';
import { AddReqDocComponent } from './req-document/req-doc/add-req-doc/add-req-doc.component';
import { EditReqDocComponent } from './req-document/req-doc/edit-req-doc/edit-req-doc.component';
import { ReqDocFormComponent } from './req-document/req-doc/req-doc-form/req-doc-form.component';
import { ReqDocItemsTableComponent } from './req-document/req-doc-items/req-doc-items-table/req-doc-items-table.component';
import { ReqDocItemsDetailsTableComponent } from './req-document/req-doc-items-details/req-doc-items-details-table/req-doc-items-details-table.component';
import { JOReqDocItemsFormComponent } from './job-order-req-doc/jo-req-doc-items/jo-req-doc-items-form/jo-req-doc-items-form.component';
import { JOReqDocItemsDetailsFormComponent } from './job-order-req-doc/jo-req-doc-items-details/jo-req-doc-items-details-form/jo-req-doc-items-details-form.component';
import { JOReqDocFormComponent } from './job-order-req-doc/jo-req-doc/jo-req-doc-form/jo-req-doc-form.component';
import { JOReqDocComponent } from './job-order-req-doc/jo-req-doc/jo-req-doc.component';
import { EditJOReqDocComponent } from './job-order-req-doc/jo-req-doc/edit-jo-req-doc/edit-jo-req-doc.component';
import { JOAddReqDocComponent } from './job-order-req-doc/jo-req-doc/add-jo-req-doc/add-jo-req-doc.component';
import { OpenBalViewComponent } from './open-balance/open-bal-view/open-bal-view.component';
import { OpenBalItemsTableComponent } from './open-balance/open-bal-items/open-bal-items-table/open-bal-items-table.component';
import { OpenBalItemsDetailsTableComponent } from './open-balance/open-bal-items-details/open-bal-items-details-table/open-bal-items-details-table.component';
import { JOReqDocItemsTableComponent } from './job-order-req-doc/jo-req-doc-items/jo-req-doc-items-table/jo-req-doc-items-table.component';
import { JOReqDocItemsDetailsTableComponent } from './job-order-req-doc/jo-req-doc-items-details/jo-req-doc-items-details-table/jo-req-doc-items-details-table.component';
import { JoReqDocViewComponent } from './job-order-req-doc/jo-req-doc-view/jo-req-doc-view.component';
import { JobOrderViewComponent } from './job-order-req-doc/jo-req-doc/job-order-view/job-order-view.component';
import { JODipsDocComponent } from './job-order-dispence/jo-disp-doc/jo-disp-doc.component';
import { JODipsDocItemsDetailsFormComponent } from './job-order-dispence/jo-disp-doc-items-details/jo-disp-doc-items-details-form/jo-disp-doc-items-details-form.component';
import { JODipsDocItemsFormComponent } from './job-order-dispence/jo-disp-doc-items/jo-disp-doc-items-form/jo-disp-doc-items-form.component';
import { AddJODipsDocComponent } from './job-order-dispence/jo-disp-doc/add-jo-disp-doc/add-jo-disp-doc.component';
import { EditJODipsDocComponent } from './job-order-dispence/jo-disp-doc/edit-jo-disp-doc/edit-jo-disp-doc.component';
import { JODipsDocFormComponent } from './job-order-dispence/jo-disp-doc/jo-disp-doc-form/jo-disp-doc-form.component';
import { JODipsDocItemsTableComponent } from './job-order-dispence/jo-disp-doc-items/jo-disp-doc-items-table/jo-disp-doc-items-table.component';
import { JODipsDocItemsDetailsTableComponent } from './job-order-dispence/jo-disp-doc-items-details/jo-disp-doc-items-details-table/jo-disp-doc-items-details-table.component';
import { JoDispDocViewComponent } from './job-order-dispence/jo-disp-doc-view/jo-disp-doc-view.component';
import { ItemBalanceUnitsComponent } from './item-balance-units/item-balance-units.component';
import { RcvDocumentComponent } from './rcv-document/rcv-document/rcv-document.component';
import { AddRcvDocumentComponent } from './rcv-document/rcv-document/add-rcv-document/add-rcv-document.component';
import { EditRcvDocumentComponent } from './rcv-document/rcv-document/edit-rcv-document/edit-rcv-document.component';
import { RcvDocumentFormComponent } from './rcv-document/rcv-document/rcv-document-form/rcv-document-form.component';
import { RcvDocumentItemsFormComponent } from './rcv-document/rcv-document-items/rcv-document-items-form/rcv-document-items-form.component';
import { RcvDocumentItemsDetailsFormComponent } from './rcv-document/rcv-document-items-details/rcv-document-items-details-form/rcv-document-items-details-form.component';
import { RcvInspectionsComponent } from './rcv-inspection/rcv-inspection/rcv-inspection.component';
import { AddRcvInspectionComponent } from './rcv-inspection/rcv-inspection/add-rcv-inspection/add-rcv-inspection.component';
import { EditRcvInspectionComponent } from './rcv-inspection/rcv-inspection/edit-rcv-document/edit-rcv-inspection.component';
import { RcvInspectionFormComponent } from './rcv-inspection/rcv-inspection/rcv-inspection-form/rcv-inspection-form.component';
import { RcvInspectionItemsFormComponent } from './rcv-inspection/rcv-inspection-items/rcv-inspection-items-form/rcv-inspection-items-form.component';
import { RcvInspectionItemsTableComponent } from './rcv-inspection/rcv-inspection-items/rcv-inspection-items-table/rcv-inspection-items-table.component';
import { RcvInspectonItemsDetailsTableComponent } from './rcv-inspection/rcv-inspection-items-details/rcv-inspecton-items-details-table/rcv-inspecton-items-details-table.component';
import { RcvInspectionItemsDetailsFormComponent } from './rcv-inspection/rcv-inspection-items-details/rcv-inspecton-items-details-form/rcv-inspection-items-details-form.component';
import { RcvTemporarysComponent } from './rcv-temporary/rcv-temporary/rcv-temporary.component';
import { AddRcvTemporaryComponent } from './rcv-temporary/rcv-temporary/add-rcv-temporary/add-rcv-temporary.component';
import { EditRcvTemporaryComponent } from './rcv-temporary/rcv-temporary/edit-rcv-temporary/edit-rcv-temporary.component';
import { RcvTemporaryFormComponent } from './rcv-temporary/rcv-temporary/rcv-temporary-form/rcv-temporary-form.component';
import { RcvTemporaryItemsFormComponent } from './rcv-temporary/rcv-temporary-items/rcv-temporary-items-form/rcv-temporary-items-form.component';
import { RcvTemporaryItemsTableComponent } from './rcv-temporary/rcv-temporary-items/rcv-temporary-items-table/rcv-temporary-items-table.component';
import { RcvTemporaryItemsDetailsTableComponent } from './rcv-temporary/rcv-temporary-items-details/rcv-temporary-items-details-table/rcv-temporary-items-details-table.component';
import { RcvTemporaryItemsDetailsFormComponent } from './rcv-temporary/rcv-temporary-items-details/rcv-temporary-items-details-form/rcv-temporary-items-details-form.component';
import { RcvDocViewComponent } from './rcv-document/rcv-doc-view/rcv-doc-view.component';
import { RcvDocItemsDetailsTableComponent } from './rcv-document/rcv-document-items-details/rcv-doc-items-details-table/rcv-doc-items-details-table.component';
import { RcvDocumentItemsTableComponent } from './rcv-document/rcv-document-items/rcv-document-items-table/rcv-document-items-table.component';
import { RcvTempViewComponent } from './rcv-temporary/rcv-temporary-view/rcv-doc-view.component';
import { RcvInspViewComponent } from './rcv-inspection/rcv-inspection-view/rcv-doc-view.component';
import { TransfersComponent } from './transfers/transfers.component';
import { InvTransferItemsTableComponent } from './transfers/transfer/inv-transfer-items/inv-transfer-items-table/inv-transfer-items-table.component';
import { InvTransItemsDetailTableComponent } from './transfers/transfer/inv-transfer-items-details/inv-trans-items-detail-table/inv-trans-items-detail-table.component';
import { InvTransferViewComponent } from './transfers/transfer/inv-transfer-view/inv-transfer-view.component';
import { InvTransferComponent } from './transfers/transfer/inv-transfer/inv-transfer.component';
import { AddInvTransferComponent } from './transfers/transfer/inv-transfer/add-inv-transfer/add-inv-transfer.component';
import { EditInvTransferComponent } from './transfers/transfer/inv-transfer/edit-inv-transfer/edit-inv-transfer.component';
import { InvTransferFormComponent } from './transfers/transfer/inv-transfer/inv-transfer-form/inv-transfer-form.component';
import { InvTransferItemsFormComponent } from './transfers/transfer/inv-transfer-items/inv-transfer-items-form/inv-transfer-items-form.component';
import { InvTransferItemDetailsFormComponent } from './transfers/transfer/inv-transfer-items-details/inv-transfer-item-details-form/inv-transfer-item-details-form.component';
import { InvTransferRItemsTableComponent } from './transfers/transferR/inv-transferR-items/inv-transferR-items-table/inv-transferR-items-table.component';
import { InvTransRItemsDetailTableComponent } from './transfers/transferR/inv-transferR-items-details/inv-transR-items-detail-table/inv-transR-items-detail-table.component';
import { InvTransferRViewComponent } from './transfers/transferR/inv-transferR-view/inv-transferR-view.component';
import { InvTransferRComponent } from './transfers/transferR/inv-transferR/inv-transferR.component';
import { AddInvTransferRComponent } from './transfers/transferR/inv-transferR/add-inv-transferR/add-inv-transferR.component';
import { EditInvTransferRComponent } from './transfers/transferR/inv-transferR/edit-inv-transferR/edit-inv-transferR.component';
import { InvTransferRFormComponent } from './transfers/transferR/inv-transferR/inv-transferR-form/inv-transferR-form.component';
import { InvTransferRItemsFormComponent } from './transfers/transferR/inv-transferR-items/inv-transferR-items-form/inv-transferR-items-form.component';
import { InvTransferRItemDetailsFormComponent } from './transfers/transferR/inv-transferR-items-details/inv-transferR-item-details-form/inv-transferR-item-details-form.component';
import { InvStocktakingComponent } from './inv-stocktaking/inv-stocktaking.component';
import { AddInvStocktakingComponent } from './inv-stocktaking/add-inv-stocktaking/add-inv-stocktaking.component';
import { EditInvStocktakingComponent } from './inv-stocktaking/edit-inv-stocktaking/edit-inv-stocktaking.component';
import { InvStocktakingFormComponent } from './inv-stocktaking/inv-stocktaking-form/inv-stocktaking-form.component';
import { InvStocktakingCommitteeTableComponent } from './inv-stocktaking/inv-stocktaking-committee/inv-stocktaking-committee-table/inv-stocktaking-committee-table.component';
import { InvStocktakingItemsTableComponent } from './inv-stocktaking/inv-stocktaking-items/inv-stocktaking-items-table/inv-stocktaking-items-table.component';
import { InvStocktakingItemsFormComponent } from './inv-stocktaking/inv-stocktaking-items/inv-stocktaking-items-form/inv-stocktaking-items-form.component';
import { InvStocktakingCommitteeFormComponent } from './inv-stocktaking/inv-stocktaking-committee/inv-stocktaking-committee-form/inv-stocktaking-committee-form.component';
import { InvStocktakingViewComponent } from './inv-stocktaking/inv-stocktaking-view/inv-stocktaking-view.component';
import { InvStocktakingBalanceUComponent } from './inv-stocktaking/inv-stocktaking-balance-u/inv-stocktaking-balance-u.component';
import { InvStocktakingBalUTableComponent } from './inv-stocktaking/inv-stocktaking-balance-u/inv-stocktaking-bal-u-table/inv-stocktaking-bal-u-table.component';
import { InvStocktakingBalUFormComponent } from './inv-stocktaking/inv-stocktaking-balance-u/inv-stocktaking-bal-u-form/inv-stocktaking-bal-u-form.component';
import { ReqDocViewComponent } from './req-document/req-doc-view/req-doc-view.component';
import { TransferCustodyComponent } from './transfer-custody/transfer-custody.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { StoreBalanceComponent } from './purchase-request/store-balance/store-balance.component';
import { StoreBalDetailsComponent } from './purchase-request/store-balance/store-bal-details/store-bal-details.component';
import { ItemsListingComponent } from './item-balance-units/items-listing/items-listing.component';
import { ReqCommitteeComponent } from './req-document/req-committee/req-committee.component';
import { ReqCommiteeFormComponent } from './req-document/req-committee/req-commitee-form/req-commitee-form.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { PurchaseRequestViewComponent } from './purchase-request/purchase-request-view/purchase-request-view.component';
import { PurchaseRequestItemsComponent } from './purchase-request/purchase-request-view/purchase-request-items/purchase-request-items.component';
import { DispenseTransactionsComponent } from './dispense-transactions/dispense-transactions.component';
import { DocumentStatus } from 'src/app/pipes/document-status.pipe';

const COMPONENTS = [
    StoreListingComponent,
    OpenBalComponent,
    OpenBalItemsDetailsFormComponent,
    OpenBalItemsFormComponent,
    AddOpenBalComponent,
    EditOpenBalComponent,
    OpenBalFormComponent,
    RcvDocumentComponent,
    AddRcvDocumentComponent,
    EditRcvDocumentComponent,
    RcvDocumentFormComponent,
    RcvDocumentItemsFormComponent,
    RcvDocumentItemsDetailsFormComponent,
    InvTransferItemsTableComponent,
    InvTransItemsDetailTableComponent, 
    InvTransferViewComponent,
    InvTransferComponent,
    AddInvTransferComponent,
    EditInvTransferComponent,
    InvTransferFormComponent,
    InvTransferItemsFormComponent,
    InvTransferItemDetailsFormComponent,
    InvTransferRItemsTableComponent,
    InvTransRItemsDetailTableComponent, 
    InvTransferRViewComponent,
    InvTransferRComponent,
    AddInvTransferRComponent,
    EditInvTransferRComponent,
    InvTransferRFormComponent,
    InvTransferRItemsFormComponent,
    InvTransferRItemDetailsFormComponent,
    StoreOperationViewComponent,
    RcvInspectionsComponent,
    AddRcvInspectionComponent,
    EditRcvInspectionComponent,
    RcvInspectionFormComponent,
    RcvInspectionItemsFormComponent,
    RcvInspectionItemsTableComponent,
    RcvInspectonItemsDetailsTableComponent,
    RcvInspectionItemsDetailsFormComponent,
    RcvTemporarysComponent,
    AddRcvTemporaryComponent,
    EditRcvTemporaryComponent,
    RcvTemporaryFormComponent,
    RcvTemporaryItemsFormComponent,
    RcvTemporaryItemsTableComponent,
    RcvTemporaryItemsDetailsTableComponent,
    RcvTemporaryItemsDetailsFormComponent,
    DipsDocComponent,
    DipsDocItemsDetailsFormComponent,
    DipsDocItemsFormComponent,
    AddDipsDocComponent,
    EditDipsDocComponent,
    DipsDocFormComponent,
    DipsDocItemsTableComponent,
    DipsDocItemsDetailsTableComponent,
    JODipsDocComponent,
    JODipsDocItemsDetailsFormComponent,
    JODipsDocItemsFormComponent,
    AddJODipsDocComponent,
    EditJODipsDocComponent,
    JODipsDocFormComponent,
    JODipsDocItemsTableComponent,
    JODipsDocItemsDetailsTableComponent,
    ReqDocComponent,
    ReqDocItemsDetailsFormComponent,
    ReqDocItemsFormComponent,
    AddReqDocComponent,
    EditReqDocComponent,
    ReqDocFormComponent,
    ReqDocItemsTableComponent,
    ReqDocItemsDetailsTableComponent,
    JOReqDocFormComponent,
    JOReqDocComponent,
    JOReqDocItemsDetailsFormComponent,
    JOReqDocItemsFormComponent,
    JOAddReqDocComponent,
    EditJOReqDocComponent,
    OpenBalViewComponent,
    OpenBalItemsTableComponent,
    OpenBalItemsDetailsTableComponent,
    RcvDocViewComponent,
    RcvDocItemsDetailsTableComponent,
    RcvDocumentItemsTableComponent,
    JOReqDocItemsTableComponent,
    JOReqDocItemsDetailsTableComponent,
    JoReqDocViewComponent,
    JobOrderViewComponent,
    JoDispDocViewComponent,
    ItemBalanceUnitsComponent,
    RcvTempViewComponent,
    RcvInspViewComponent,
    TransfersComponent,
    InvStocktakingComponent, 
    AddInvStocktakingComponent, 
    EditInvStocktakingComponent, 
    InvStocktakingFormComponent, 
    InvStocktakingCommitteeTableComponent, 
    InvStocktakingItemsTableComponent, 
    InvStocktakingItemsFormComponent,
    ReqDocViewComponent,
    TransferCustodyComponent,
    InvStocktakingCommitteeFormComponent, 
    InvStocktakingViewComponent, 
    InvStocktakingBalanceUComponent, 
    InvStocktakingBalUTableComponent, 
    InvStocktakingBalUFormComponent, 
    TransactionsComponent, 
    StoreBalanceComponent, 
    StoreBalDetailsComponent,
    PurchaseRequestComponent
];
const PROVIDERS = [
    EditInvOpenBalanceResolver,
    EditRcvDocumentResolver,
    EditinvtransferstoreResolver,
    EditInvOpenBalanceResolver,
    EditRcvDocumentResolver,
    EditinvtransferstoreResolver,
    StoreOperationViewComponent,
    EditRcvInspectionResolver,
    EditRcvTempResolver,
    EditInvOpenBalanceItemsResolver, 
    EditInvOpenBalanceItemsDetailsResolver,
    EditReqDocResolver,
    EditDispenseResolver,
    EditinvtransferRResolver,
    InvStockTakingResolver
];

@NgModule({
    declarations: [...COMPONENTS, ItemsListingComponent, ReqCommitteeComponent, ReqCommiteeFormComponent, PurchaseRequestViewComponent, PurchaseRequestItemsComponent, DispenseTransactionsComponent,DocumentStatus],
    imports: [
        CommonModule,
        CleanUIModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ChartistModule,
        CustomSearchModule,
        OperationsRoutingModule
    ],
    providers: [...PROVIDERS],
    entryComponents:[
        OpenBalItemsFormComponent, 
        OpenBalItemsDetailsFormComponent, 
        InvTransferItemsFormComponent,
        InvTransferItemDetailsFormComponent,
        InvTransferRItemsFormComponent,
        InvTransferRItemDetailsFormComponent,
        EditOpenBalComponent,
        RcvDocumentItemsFormComponent,
        RcvDocumentItemsDetailsFormComponent,
        RcvInspectionItemsFormComponent,
        RcvInspectionItemsDetailsFormComponent,
        RcvTemporaryItemsFormComponent,
        RcvTemporaryItemsDetailsFormComponent,
        DipsDocItemsFormComponent,
        DipsDocItemsDetailsFormComponent,
        JODipsDocItemsFormComponent,
        JODipsDocItemsDetailsFormComponent,
        ReqDocItemsFormComponent, 
        ReqDocItemsDetailsFormComponent,
        JOReqDocItemsFormComponent, 
        JOReqDocItemsDetailsFormComponent,
        OpenBalViewComponent,
        OpenBalItemsTableComponent,
        RcvDocViewComponent,
        JoReqDocViewComponent,
        JoDispDocViewComponent,
        InvTransferViewComponent,
        RcvTempViewComponent,
        RcvInspViewComponent,
        InvTransferRViewComponent,
        InvStocktakingItemsFormComponent,
        InvStocktakingCommitteeFormComponent,
        InvStocktakingViewComponent,
        InvStocktakingBalUFormComponent,
        ReqDocViewComponent,
        ItemsListingComponent,
        ReqCommiteeFormComponent,
        PurchaseRequestItemsComponent
    ],
    exports:[...COMPONENTS]
})
export class OperationsModule { }
