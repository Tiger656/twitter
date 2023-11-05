"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'AlexFeller23',
        description: 'Username of user',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'qwerty123',
        description: 'Username of user',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ["admin", "regular_user"],
        description: 'User roles',
        isArray: true,
        type: String,
    }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "roles", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map