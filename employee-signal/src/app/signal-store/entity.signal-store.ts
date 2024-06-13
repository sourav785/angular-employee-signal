import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { Entity } from "../entity/models/entity.models";
import { StateStatus } from "../shared/model/shared.models";
import { Injectable, inject } from "@angular/core";
import { EntityService } from "../services/entity.service";
import { filter, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/component-store";
import { ToastrService } from "ngx-toastr";

interface EntityState {
    entities: Entity[];
    entityID: number | null;
    selectedEntity: Entity | null;
    error: string | null;
    status: StateStatus;
}

const initialState: EntityState = {
    entities: [],
    entityID: null,
    selectedEntity: null,
    error: null,
    status: StateStatus.PENDING,
};

export const EntitySignalStore = signalStore(
    withState(initialState),
    withMethods((store, entityService = inject(EntityService), toastr = inject(ToastrService)) => ({
        updateEntityId(id:number): void{
            patchState(store, (state) => ({
                entityID: id
            }));
        },
        loadEntities: rxMethod<void>(
            pipe(
                tap(() => patchState(store,(state) => ({status: StateStatus.LOADING}))),
                switchMap(() => {
                    return entityService.getEntities().pipe(
                        tapResponse({
                            next: (response) => {
                                patchState(store, (state) => ({
                                    entities: response
                                }));
                            },
                            error: (error) => {
                                console.log("Error");
                                patchState(store, (state) => ({status: StateStatus.ERROR}));
                            },
                            finalize: () => {
                                patchState(store, (state) => ({status: StateStatus.SUCCESS}));
                            }
                        })
                    );
                }),

            ),
        ),
        deleteEntity: rxMethod<number>(
            pipe(
                filter((x) => !!x),
                tap(() => patchState(store,(state) => ({status: StateStatus.LOADING}))),
                switchMap((id) => {
                    return entityService.deleteEntityById(id).pipe(
                        tapResponse({
                            next: (response) => {
                                patchState(store, (state) => ({
                                    entities: [...state.entities.filter((entity) => entity.id !== id)],
                                }));
                                toastr.success('Entity Deleted!');
                            },
                            error: (error) => {
                                console.log("Error");
                                patchState(store, (state) => ({status: StateStatus.ERROR}));
                                toastr.error('Entity Delete Error!');
                            },
                            finalize: () => {
                                patchState(store, (state) => ({status: StateStatus.SUCCESS}));
                            }
                        })
                    );
                }),

            ),
        ),
        addEntity: rxMethod<Entity>(
            pipe(
                filter((x) => !!x),
                tap(() => patchState(store,(state) => ({status: StateStatus.LOADING}))),
                switchMap((request) => {
                    return entityService.createEntity(request).pipe(
                        tapResponse({
                            next: (response) => {
                                patchState(store, (state) => ({
                                    entities: [...state.entities, response],
                                }));
                                toastr.success('Entity Added!');
                            },
                            error: (error) => {
                                console.log("Error");
                                patchState(store, (state) => ({status: StateStatus.ERROR}));
                                toastr.error('Entity Add Error!');
                            },
                            finalize: () => {
                                patchState(store, (state) => ({status: StateStatus.SUCCESS}));
                            }
                        })
                    );
                }),

            ),
        ),
        editEntity: rxMethod<Entity>(
            pipe(
                filter((x) => !!x),
                tap(() => patchState(store,(state) => ({status: StateStatus.LOADING}))),
                switchMap((request) => {
                    return entityService.updateEntityById(request).pipe(
                        tapResponse({
                            next: (response) => {
                                patchState(store, (state) => ({
                                    entities: [...state.entities.map(x => x.id === response.id ? response : x)],
                                }));
                                toastr.success('Entity Edited!');
                            },
                            error: (error) => {
                                console.log("Error");
                                patchState(store, (state) => ({status: StateStatus.ERROR}));
                                toastr.error('Entity Edit Error!');
                            },
                            finalize: () => {
                                patchState(store, (state) => ({status: StateStatus.SUCCESS}));
                            }
                        })
                    );
                }),
            ),
        ),

        getEntityById: rxMethod<number | null>(
            pipe(
                filter((x) => !!x),
                tap(() => patchState(store,(state) => ({status: StateStatus.LOADING , selectedEntity: null }))),
                switchMap((id) => {
                    return entityService.getEntityById(id).pipe(
                        tapResponse({
                            next: (response) => {
                                patchState(store, (state) => ({
                                    selectedEntity: response
                                }));
                            },
                            error: (error) => {
                                console.log("Error");
                                patchState(store, (state) => ({status: StateStatus.ERROR}));
                                toastr.error('Entity Getting Error!');
                            },
                            finalize: () => {
                                patchState(store, (state) => ({status: StateStatus.SUCCESS}));
                            }
                        })
                    );
                }),
            ),
        ),
    }))  
)