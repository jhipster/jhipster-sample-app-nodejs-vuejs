import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { UserDTO } from '../src/service/dto/user.dto';
import { UserService } from '../src/service/user.service';
import { PasswordChangeDTO } from '../src/service/dto/password-change.dto';
import { AuthService } from '../src/service/auth.service';

describe('Account', () => {
    let app: INestApplication;
    let service: UserService;
    let authService: AuthService;

    const testUserDTO: UserDTO = {
        login: 'userTestLogin',
        email: 'usertest@localhost.it',
        password: 'testPassword',
    };

    const testUserAuthenticated: any = {
        id: 42,
        login: 'userlogged',
        email: 'userlogged@localhost.it',
        password: 'userloggedPassword',
        activated: true,
    };

    const testPasswordChange: PasswordChangeDTO = {
        currentPassword: testUserAuthenticated.password,
        newPassword: 'newPassword',
    };

    let userAuthenticated: UserDTO;

    const authGuardMock = {
        canActivate: (context: ExecutionContext): any => {
            const req = context.switchToHttp().getRequest();
            req.user = testUserAuthenticated;
            return true;
        },
    };

    const rolesGuardMock = { canActivate: (): any => true };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        service = moduleFixture.get<UserService>(UserService);
        authService = moduleFixture.get<AuthService>(AuthService);
        userAuthenticated = await service.save(testUserAuthenticated, testUserAuthenticated.login, true);
    });

    it('/POST register new user', async () => {
        const createdUser: UserDTO = (
            await request(app.getHttpServer())
                .post('/api/register')
                .send(testUserDTO)
                .expect(201)
        ).body;

        expect(createdUser.login).toEqual(testUserDTO.login);
        await service.delete(createdUser);
    });

    it('/GET activate account', async () => {
        await request(app.getHttpServer())
            .get('/api/activate')
            .expect(500);
    });

    it('/GET authenticate', async () => {
        const loginValue: any = (
            await request(app.getHttpServer())
                .get('/api/authenticate')
                .expect(200)
        ).text;

        expect(loginValue).toEqual(testUserAuthenticated.login);
    });

    it('/GET account', async () => {
        await request(app.getHttpServer())
            .get('/api/account')
            .expect(200);
    });

    it('/POST account update settings', async () => {
        const savedTestUser: UserDTO = {
            firstName: 'updateFirstName',
            lastName: 'updateLastName',
            ...testUserAuthenticated,
        };
        await request(app.getHttpServer())
            .post('/api/account')
            .send(savedTestUser)
            .expect(201);

        const updatedUserSettings: UserDTO = await service.findByFields({
            where: { login: testUserAuthenticated.login },
        });
        expect(updatedUserSettings.firstName).toEqual(savedTestUser.firstName);
        expect(updatedUserSettings.lastName).toEqual(savedTestUser.lastName);
    });

    it('/POST change password', async () => {
        await request(app.getHttpServer())
            .post('/api/account/change-password')
            .send(testPasswordChange)
            .expect(201);

        const successFullyLoggedInWithNewPassword = await authService
            .login({
                username: testUserAuthenticated.login,
                password: testPasswordChange.newPassword,
            })
            .then(
                () => true,
                () => false,
            );

        expect(successFullyLoggedInWithNewPassword).toEqual(true);
    });

    it('/POST reset password init', async () => {
        await request(app.getHttpServer())
            .post('/api/account/reset-password/init')
            .expect(500);
    });

    it('/POST reset password finish', async () => {
        await request(app.getHttpServer())
            .post('/api/account/reset-password/finish')
            .expect(500);
    });

    afterEach(async () => {
        await service.delete(userAuthenticated);
        await app.close();
    });
});
