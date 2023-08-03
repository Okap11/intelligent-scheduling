import Login from '@/views/Login'
import Reset from '@/views/Reset'
import Index from '@/views/Index'
import Schedule from '@/views/Schedule'
import StoreInformation from '@/views/StoreInformation'
import LeaveApproval from '@/views/LeaveApproval'
import ChangeSchedule from '@/views/ChangeSchedule'
import Leave from '@/views/Leave'
import Change from '@/views/Change'
import UserInfo from '@/views/UserInfo'
import Manage from '@/views/Manage'
import Router from 'vue-router'


export const constantRouterMap = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/Reset',
        component: Reset
    },
    {
        path: '/Index',
        component: Index,
        redirect: '/Index/Schedule',
        children:[
            {
                path: 'Schedule',
                component: Schedule
            },
            {
                path: 'StoreInformation',
                component: StoreInformation
            },
            {
                path: 'Manage',
                component: Manage
            },
            {
                path: 'UserInfo',
                component: UserInfo
            },
            {
                path: 'LeaveApproval',
                component: LeaveApproval
            },
            {
                path:'Leave',
                component: Leave
            },
            {
                path: 'ChangeSchedule',
                component: ChangeSchedule
            },
            {
                path: 'Change',
                component: Change
            }
        ]
    }
]

const router = new Router({
    routes: constantRouterMap
})

// router.beforeEach( (to, from, next) =>{
//     if(localStorage.email){
//         next()
//     }
//     if(to.path == '/'){
//         next()
//     }else if(!localStorage.email){
//         next('/')
//         alert('请输入您的账号密码！')
//     }
// })

export default router
