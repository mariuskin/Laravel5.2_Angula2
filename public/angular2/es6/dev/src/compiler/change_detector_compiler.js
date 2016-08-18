var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SourceExpressions, moduleRef } from './source_module';
import { ChangeDetectorJITGenerator } from 'angular2/src/core/change_detection/change_detection_jit_generator';
import { AbstractChangeDetector } from 'angular2/src/core/change_detection/abstract_change_detector';
import { ChangeDetectionUtil } from 'angular2/src/core/change_detection/change_detection_util';
import { ChangeDetectorState } from 'angular2/src/core/change_detection/constants';
import { createChangeDetectorDefinitions } from './change_definition_factory';
import { IS_DART, CONST_EXPR } from 'angular2/src/facade/lang';
import { ChangeDetectorGenConfig, DynamicProtoChangeDetector } from 'angular2/src/core/change_detection/change_detection';
import { Codegen } from 'angular2/src/transform/template_compiler/change_detector_codegen';
import { MODULE_SUFFIX } from './util';
import { Injectable } from 'angular2/src/core/di';
const ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
const UTIL = "ChangeDetectionUtil";
const CHANGE_DETECTOR_STATE = "ChangeDetectorState";
export const CHANGE_DETECTION_JIT_IMPORTS = CONST_EXPR({
    'AbstractChangeDetector': AbstractChangeDetector,
    'ChangeDetectionUtil': ChangeDetectionUtil,
    'ChangeDetectorState': ChangeDetectorState
});
var ABSTRACT_CHANGE_DETECTOR_MODULE = moduleRef(`package:angular2/src/core/change_detection/abstract_change_detector${MODULE_SUFFIX}`);
var UTIL_MODULE = moduleRef(`package:angular2/src/core/change_detection/change_detection_util${MODULE_SUFFIX}`);
var PREGEN_PROTO_CHANGE_DETECTOR_MODULE = moduleRef(`package:angular2/src/core/change_detection/pregen_proto_change_detector${MODULE_SUFFIX}`);
var CONSTANTS_MODULE = moduleRef(`package:angular2/src/core/change_detection/constants${MODULE_SUFFIX}`);
export let ChangeDetectionCompiler = class {
    constructor(_genConfig) {
        this._genConfig = _genConfig;
    }
    compileComponentRuntime(componentType, strategy, parsedTemplate) {
        var changeDetectorDefinitions = createChangeDetectorDefinitions(componentType, strategy, this._genConfig, parsedTemplate);
        return changeDetectorDefinitions.map(definition => this._createChangeDetectorFactory(definition));
    }
    _createChangeDetectorFactory(definition) {
        var proto = new DynamicProtoChangeDetector(definition);
        return () => proto.instantiate();
    }
    compileComponentCodeGen(componentType, strategy, parsedTemplate) {
        var changeDetectorDefinitions = createChangeDetectorDefinitions(componentType, strategy, this._genConfig, parsedTemplate);
        var factories = [];
        var index = 0;
        var sourceParts = changeDetectorDefinitions.map(definition => {
            var codegen;
            var sourcePart;
            // TODO(tbosch): move the 2 code generators to the same place, one with .dart and one with .ts
            // suffix
            // and have the same API for calling them!
            if (IS_DART) {
                codegen = new Codegen(PREGEN_PROTO_CHANGE_DETECTOR_MODULE);
                var className = `_${definition.id}`;
                var typeRef = (index === 0 && componentType.isHost) ?
                    'dynamic' :
                    `${moduleRef(componentType.moduleUrl)}${componentType.name}`;
                codegen.generate(typeRef, className, definition);
                factories.push(`${className}.newChangeDetector`);
                sourcePart = codegen.toString();
            }
            else {
                codegen = new ChangeDetectorJITGenerator(definition, `${UTIL_MODULE}${UTIL}`, `${ABSTRACT_CHANGE_DETECTOR_MODULE}${ABSTRACT_CHANGE_DETECTOR}`, `${CONSTANTS_MODULE}${CHANGE_DETECTOR_STATE}`);
                factories.push(`function() { return new ${codegen.typeName}(); }`);
                sourcePart = codegen.generateSource();
            }
            index++;
            return sourcePart;
        });
        return new SourceExpressions(sourceParts, factories);
    }
};
ChangeDetectionCompiler = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ChangeDetectorGenConfig])
], ChangeDetectionCompiler);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdG9yX2NvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2NoYW5nZV9kZXRlY3Rvcl9jb21waWxlci50cyJdLCJuYW1lcyI6WyJDaGFuZ2VEZXRlY3Rpb25Db21waWxlciIsIkNoYW5nZURldGVjdGlvbkNvbXBpbGVyLmNvbnN0cnVjdG9yIiwiQ2hhbmdlRGV0ZWN0aW9uQ29tcGlsZXIuY29tcGlsZUNvbXBvbmVudFJ1bnRpbWUiLCJDaGFuZ2VEZXRlY3Rpb25Db21waWxlci5fY3JlYXRlQ2hhbmdlRGV0ZWN0b3JGYWN0b3J5IiwiQ2hhbmdlRGV0ZWN0aW9uQ29tcGlsZXIuY29tcGlsZUNvbXBvbmVudENvZGVHZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztPQUNPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFDLE1BQU0saUJBQWlCO09BQ3JELEVBQ0wsMEJBQTBCLEVBQzNCLE1BQU0sbUVBQW1FO09BQ25FLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw2REFBNkQ7T0FDM0YsRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDBEQUEwRDtPQUNyRixFQUFDLG1CQUFtQixFQUFDLE1BQU0sOENBQThDO09BRXpFLEVBQUMsK0JBQStCLEVBQUMsTUFBTSw2QkFBNkI7T0FDcEUsRUFBQyxPQUFPLEVBQWMsVUFBVSxFQUFDLE1BQU0sMEJBQTBCO09BRWpFLEVBQ0wsdUJBQXVCLEVBRXZCLDBCQUEwQixFQUUzQixNQUFNLHFEQUFxRDtPQUdyRCxFQUFDLE9BQU8sRUFBQyxNQUFNLGtFQUFrRTtPQUNqRixFQUFDLGFBQWEsRUFBQyxNQUFNLFFBQVE7T0FDN0IsRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0I7QUFFL0MsTUFBTSx3QkFBd0IsR0FBRyx3QkFBd0IsQ0FBQztBQUMxRCxNQUFNLElBQUksR0FBRyxxQkFBcUIsQ0FBQztBQUNuQyxNQUFNLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO0FBRXBELGFB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WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ05BLE9BQU9BLEdBQUdBLElBQUlBLDBCQUEwQkEsQ0FDcENBLFVBQVVBLEVBQUVBLEdBQUdBLFdBQVdBLEdBQUdBLElBQUlBLEVBQUVBLEVBQ25DQSxHQUFHQSwrQkFBK0JBLEdBQUdBLHdCQUF3QkEsRUFBRUEsRUFDL0RBLEdBQUdBLGdCQUFnQkEsR0FBR0EscUJBQXFCQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDbkRBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLDJCQUEyQkEsT0FBT0EsQ0FBQ0EsUUFBUUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25FQSxVQUFVQSxHQUFHQSxPQUFPQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtZQUN4Q0EsQ0FBQ0E7WUFDREEsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDUkEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDcEJBLENBQUNBLENBQUNBLENBQUNBO1FBQ0hBLE1BQU1BLENBQUNBLElBQUlBLGlCQUFpQkEsQ0FBQ0EsV0FBV0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDdkRBLENBQUNBO0FBQ0hKLENBQUNBO0FBbkREO0lBQUMsVUFBVSxFQUFFOzs0QkFtRFo7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcGlsZVR5cGVNZXRhZGF0YX0gZnJvbSAnLi9kaXJlY3RpdmVfbWV0YWRhdGEnO1xuaW1wb3J0IHtTb3VyY2VFeHByZXNzaW9ucywgbW9kdWxlUmVmfSBmcm9tICcuL3NvdXJjZV9tb2R1bGUnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JKSVRHZW5lcmF0b3Jcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX2ppdF9nZW5lcmF0b3InO1xuaW1wb3J0IHtBYnN0cmFjdENoYW5nZURldGVjdG9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2Fic3RyYWN0X2NoYW5nZV9kZXRlY3Rvcic7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblV0aWx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbl91dGlsJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JTdGF0ZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jb25zdGFudHMnO1xuXG5pbXBvcnQge2NyZWF0ZUNoYW5nZURldGVjdG9yRGVmaW5pdGlvbnN9IGZyb20gJy4vY2hhbmdlX2RlZmluaXRpb25fZmFjdG9yeSc7XG5pbXBvcnQge0lTX0RBUlQsIGlzSnNPYmplY3QsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yR2VuQ29uZmlnLFxuICBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb24sXG4gIER5bmFtaWNQcm90b0NoYW5nZURldGVjdG9yLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb24nO1xuXG5pbXBvcnQge1RlbXBsYXRlQXN0fSBmcm9tICcuL3RlbXBsYXRlX2FzdCc7XG5pbXBvcnQge0NvZGVnZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy90cmFuc2Zvcm0vdGVtcGxhdGVfY29tcGlsZXIvY2hhbmdlX2RldGVjdG9yX2NvZGVnZW4nO1xuaW1wb3J0IHtNT0RVTEVfU1VGRklYfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5cbmNvbnN0IEFCU1RSQUNUX0NIQU5HRV9ERVRFQ1RPUiA9IFwiQWJzdHJhY3RDaGFuZ2VEZXRlY3RvclwiO1xuY29uc3QgVVRJTCA9IFwiQ2hhbmdlRGV0ZWN0aW9uVXRpbFwiO1xuY29uc3QgQ0hBTkdFX0RFVEVDVE9SX1NUQVRFID0gXCJDaGFuZ2VEZXRlY3RvclN0YXRlXCI7XG5cbmV4cG9ydCBjb25zdCBDSEFOR0VfREVURUNUSU9OX0pJVF9JTVBPUlRTID0gQ09OU1RfRVhQUih7XG4gICdBYnN0cmFjdENoYW5nZURldGVjdG9yJzogQWJzdHJhY3RDaGFuZ2VEZXRlY3RvcixcbiAgJ0NoYW5nZURldGVjdGlvblV0aWwnOiBDaGFuZ2VEZXRlY3Rpb25VdGlsLFxuICAnQ2hhbmdlRGV0ZWN0b3JTdGF0ZSc6IENoYW5nZURldGVjdG9yU3RhdGVcbn0pO1xuXG52YXIgQUJTVFJBQ1RfQ0hBTkdFX0RFVEVDVE9SX01PRFVMRSA9IG1vZHVsZVJlZihcbiAgICBgcGFja2FnZTphbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2Fic3RyYWN0X2NoYW5nZV9kZXRlY3RvciR7TU9EVUxFX1NVRkZJWH1gKTtcbnZhciBVVElMX01PRFVMRSA9XG4gICAgbW9kdWxlUmVmKGBwYWNrYWdlOmFuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbl91dGlsJHtNT0RVTEVfU1VGRklYfWApO1xudmFyIFBSRUdFTl9QUk9UT19DSEFOR0VfREVURUNUT1JfTU9EVUxFID0gbW9kdWxlUmVmKFxuICAgIGBwYWNrYWdlOmFuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vcHJlZ2VuX3Byb3RvX2NoYW5nZV9kZXRlY3RvciR7TU9EVUxFX1NVRkZJWH1gKTtcbnZhciBDT05TVEFOVFNfTU9EVUxFID1cbiAgICBtb2R1bGVSZWYoYHBhY2thZ2U6YW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jb25zdGFudHMke01PRFVMRV9TVUZGSVh9YCk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGFuZ2VEZXRlY3Rpb25Db21waWxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2dlbkNvbmZpZzogQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcpIHt9XG5cbiAgY29tcGlsZUNvbXBvbmVudFJ1bnRpbWUoY29tcG9uZW50VHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YSwgc3RyYXRlZ3k6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRUZW1wbGF0ZTogVGVtcGxhdGVBc3RbXSk6IEZ1bmN0aW9uW10ge1xuICAgIHZhciBjaGFuZ2VEZXRlY3RvckRlZmluaXRpb25zID1cbiAgICAgICAgY3JlYXRlQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9ucyhjb21wb25lbnRUeXBlLCBzdHJhdGVneSwgdGhpcy5fZ2VuQ29uZmlnLCBwYXJzZWRUZW1wbGF0ZSk7XG4gICAgcmV0dXJuIGNoYW5nZURldGVjdG9yRGVmaW5pdGlvbnMubWFwKGRlZmluaXRpb24gPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUNoYW5nZURldGVjdG9yRmFjdG9yeShkZWZpbml0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVDaGFuZ2VEZXRlY3RvckZhY3RvcnkoZGVmaW5pdGlvbjogQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uKTogRnVuY3Rpb24ge1xuICAgIHZhciBwcm90byA9IG5ldyBEeW5hbWljUHJvdG9DaGFuZ2VEZXRlY3RvcihkZWZpbml0aW9uKTtcbiAgICByZXR1cm4gKCkgPT4gcHJvdG8uaW5zdGFudGlhdGUoKTtcbiAgfVxuXG4gIGNvbXBpbGVDb21wb25lbnRDb2RlR2VuKGNvbXBvbmVudFR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEsIHN0cmF0ZWd5OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkVGVtcGxhdGU6IFRlbXBsYXRlQXN0W10pOiBTb3VyY2VFeHByZXNzaW9ucyB7XG4gICAgdmFyIGNoYW5nZURldGVjdG9yRGVmaW5pdGlvbnMgPVxuICAgICAgICBjcmVhdGVDaGFuZ2VEZXRlY3RvckRlZmluaXRpb25zKGNvbXBvbmVudFR5cGUsIHN0cmF0ZWd5LCB0aGlzLl9nZW5Db25maWcsIHBhcnNlZFRlbXBsYXRlKTtcbiAgICB2YXIgZmFjdG9yaWVzID0gW107XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgc291cmNlUGFydHMgPSBjaGFuZ2VEZXRlY3RvckRlZmluaXRpb25zLm1hcChkZWZpbml0aW9uID0+IHtcbiAgICAgIHZhciBjb2RlZ2VuOiBhbnk7XG4gICAgICB2YXIgc291cmNlUGFydDogc3RyaW5nO1xuICAgICAgLy8gVE9ETyh0Ym9zY2gpOiBtb3ZlIHRoZSAyIGNvZGUgZ2VuZXJhdG9ycyB0byB0aGUgc2FtZSBwbGFjZSwgb25lIHdpdGggLmRhcnQgYW5kIG9uZSB3aXRoIC50c1xuICAgICAgLy8gc3VmZml4XG4gICAgICAvLyBhbmQgaGF2ZSB0aGUgc2FtZSBBUEkgZm9yIGNhbGxpbmcgdGhlbSFcbiAgICAgIGlmIChJU19EQVJUKSB7XG4gICAgICAgIGNvZGVnZW4gPSBuZXcgQ29kZWdlbihQUkVHRU5fUFJPVE9fQ0hBTkdFX0RFVEVDVE9SX01PRFVMRSk7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBgXyR7ZGVmaW5pdGlvbi5pZH1gO1xuICAgICAgICB2YXIgdHlwZVJlZiA9IChpbmRleCA9PT0gMCAmJiBjb21wb25lbnRUeXBlLmlzSG9zdCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnZHluYW1pYycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBgJHttb2R1bGVSZWYoY29tcG9uZW50VHlwZS5tb2R1bGVVcmwpfSR7Y29tcG9uZW50VHlwZS5uYW1lfWA7XG4gICAgICAgIGNvZGVnZW4uZ2VuZXJhdGUodHlwZVJlZiwgY2xhc3NOYW1lLCBkZWZpbml0aW9uKTtcbiAgICAgICAgZmFjdG9yaWVzLnB1c2goYCR7Y2xhc3NOYW1lfS5uZXdDaGFuZ2VEZXRlY3RvcmApO1xuICAgICAgICBzb3VyY2VQYXJ0ID0gY29kZWdlbi50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29kZWdlbiA9IG5ldyBDaGFuZ2VEZXRlY3RvckpJVEdlbmVyYXRvcihcbiAgICAgICAgICAgIGRlZmluaXRpb24sIGAke1VUSUxfTU9EVUxFfSR7VVRJTH1gLFxuICAgICAgICAgICAgYCR7QUJTVFJBQ1RfQ0hBTkdFX0RFVEVDVE9SX01PRFVMRX0ke0FCU1RSQUNUX0NIQU5HRV9ERVRFQ1RPUn1gLFxuICAgICAgICAgICAgYCR7Q09OU1RBTlRTX01PRFVMRX0ke0NIQU5HRV9ERVRFQ1RPUl9TVEFURX1gKTtcbiAgICAgICAgZmFjdG9yaWVzLnB1c2goYGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3ICR7Y29kZWdlbi50eXBlTmFtZX0oKTsgfWApO1xuICAgICAgICBzb3VyY2VQYXJ0ID0gY29kZWdlbi5nZW5lcmF0ZVNvdXJjZSgpO1xuICAgICAgfVxuICAgICAgaW5kZXgrKztcbiAgICAgIHJldHVybiBzb3VyY2VQYXJ0O1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgU291cmNlRXhwcmVzc2lvbnMoc291cmNlUGFydHMsIGZhY3Rvcmllcyk7XG4gIH1cbn1cbiJdfQ==