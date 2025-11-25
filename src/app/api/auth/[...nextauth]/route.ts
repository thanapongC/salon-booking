import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
import { PrismaClient, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60 // 1 hours
  },
  // pages: {
  //   signIn: "/sign-in"
  // },
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        const { email, password } = credentials ?? {};

        // console.log(email)

        if (!email || !password) {
          throw new Error("โปรดกรอกอีเมลและรหัสผ่าน");
        }


        let user = await prisma.user.findFirst({
          select: {
            password: true, // เลือก password
            email: true,
            userId: true,
            role: {
              select: {
                name: true,
                roleId: true
              },
            },
            store: {
              select: {
                storeName: true,
                id: true
              }
            }
          }, where: {
            email: {
              equals: email
            },
            userStatus: {
              equals: UserStatus.ACTIVE
            },
            // isEmailVerified : {
            //   equals: true
            // }     
          },
        })

        console.log(user?.store)

        if (!user || !user.password) {
          throw new Error("โปรดตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน");
        }

        const isPasswordValid = await compare(
          password,
          user.password
        )

        if (user && isPasswordValid) {
          // return user;
          return {
            email: user.email,
            id: user.userId.toString(),
            roleName: user.role?.name,
            roleId: user.role?.roleId,
            storeName: user.store?.storeName,
            storeId: user.store?.id,
            url: '/protected/dashboard'
          }
        } else {
          throw new Error("โปรดตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roleId = user.roleId
        token.roleName = user.roleName,
        token.storeName = user.storeName,
        token.storeId = user.storeId
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          roleName: token.roleName,
          roleId: token.roleId,
          storeName: token.storeName,
          storeId: token.storeId,
        }
      }
    },
  },
};
// })


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

