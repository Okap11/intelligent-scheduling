4 系统编码和实现

4.1 系统功能说明

该系统的主要功能分为：登录模块、用户信息模块、排班管理模块、员工管理模块、门店管理模块、请假管理模块。

4.2 功能模块实现

### 4.2.1 登录模块

（一）登录

用户在进行相关操作之前，需要先登录系统。输入相关登录信息以及选择相应的登录身份，点击相关提示按钮，进行系统登录。系统对用户输入的相关信息与数据库信息进行对照验证，信息验证通过后，用户登录成功，否则提示登录信息有误，请重新登录。用户登录身份包括普通用户和管理员，登录信息包括基本的账号信息、登录 身份以及动态验证码等，设置动态验证码，可以有效防止不法分子利用非法软件对用户密码进行恶意破解。仅当输入的登录信息与数据库中保存的验证信息匹配成功时，才能够成功登录系统。

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/a951db8c-ad08-425e-9b23-3b22614b10ea)


图4.1 用户登录界面

核心代码：

​    @PostMapping("/login")

  public Result Login(@RequestBody Map<String, Object> map) {

​    String verifyInput = (String) map.get("code");

​    boolean checkResult = checkVerify(verifyInput);

​    if (checkResult) {

​      Account account = mapper.convertValue(map.get("account"), Account.class);

​      Account acc = accountService.login(account);

​      int code = acc == null ? Code.GET_ERR : Code.GET_OK;

​      User userInfo = accountService.getUserInfo(acc.getEmail());

​      Object data = userInfo.getName() == null ? false : userInfo;

​      String msg = code == Code.GET_OK ? "登录成功" : "登录失败";

​      Result result = new Result(code, data, msg);

​      return result;

​    } else {

​      Result result = new Result(Code.CHECK_ERR, false, "验证码错误");

​      return result;

​    }

   }

（二）密码找回

本系统使用最频繁的用户为员工，在使用的过程中可能会出现忘记登录密码的情况，为了使系统对用户更加友好，有必要设计开发密码找回模块，这样员工就可以通过此模块按个人信息所设置的信息找回密码。

通常，把进入该模块的入口置于登录界面中，因为用户忘记了密码，能够方便进入找回密码的操作入口。找回密码的操作共为3步依次进行，具体的步骤如下：

第一步：输入账号。在该步骤中，用户输入需找回密码的账号，并选择用户的类型（学生或管理员）。

第二步：身份证验证资料。该步骤需输入该用户的身份证。如果验证成功，将进行下一步。

第三步：输入密码。该步骤需输入新密码，提交信息后，新密码将设置成功。

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/bda7b9e0-8253-4b64-9b2e-b98cb021b3ef)


图4.2 账号密码修改界面

核心代码：

@PostMapping("/reset")

  public Result reset(@RequestBody Map<String, Object> map) {

​    String verifyInput = (String) map.get("code");

​    boolean checkResult = checkVerify(verifyInput);

​    if (checkResult) {

​      // 将JSON数据转换为Account对象

​      Account account = mapper.convertValue(map.get("account"), Account.class);

​      String idCard = (String) map.get("idCard");

​      boolean flag = accountService.reset(account, idCard);

​      int code = flag == false ? Code.UPDATE_ERR : Code.UPDATE_OK;

​      boolean data = flag == false ? false : true;

​      String msg = data ? "" : "修改失败,输入有误，请核对...";

​      Result result = new Result(code, data, msg);

​      return result;

​    } else {

​      Result result = new Result(Code.CHECK_ERR, false, "验证码错误");

​      return result;

​    }

  }

### 4.2.2 用户信息模块

用户信息模块实现包括：

1.确定收集内容：首先需要确定要收集哪些个人信息，例如姓名、职位、联系方式等基本信息，同时我们根据项目其他功能模块的需求加入了工作日偏好、工作时间偏好等。

2.设计数据表：在数据库中设计一个数据表，用于存储所有员工的个人信息。这个表包含所有收集的信息，并为每个员工分配一个唯一的工号号码。

3.开发数据录入界面：开发一个网页界面，用于让员工输入他们的个人信息并将其保存到数据库中。这个界面简单易用，通过测试可保证数据准确性。

4.开发数据查询及修改弹窗：在该页面开发一个弹窗，用于查询和修改员工的个人信息。这个界面能够根据唯一的工号号码来快速查找员工相关信息，并且允许管理员对员工信息进行修改。

5.授权访问：最后，只有授权登录的管理员或普通用户才能够访问和修改这些信息。

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/2bdca5d4-3b93-4e6b-aa3e-94e45a0fa1dc)


图4.3 用户信息界面

核心代码：

@Override

  public User getUserInfo(String email) {

​    LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper();

​    lqw.eq(User::getEmail,email)

​        .select(User::getName,User::getId,User::getStore,User::getPicName,User::getGender);

​    User user = userMapper.selectOne(lqw);

​    return user;

  }

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/9112bded-9e68-4be2-8656-d046d042597b)


图4.4 用户信息修改界面

核心代码：

//员工修改个人信息

@Override

  public boolean updateUserInfo(User user) {

​    try {

​      LambdaQueryWrapper<Store> lqw1 = new LambdaQueryWrapper<>();

​      lqw1.eq(Store::getName, user.getStore());

​      Store store = storeMapper.selectOne(lqw1);

​      user.setStore(store.getId());

​      LambdaQueryWrapper<User> lqw2 = new LambdaQueryWrapper<>();

​      lqw2.eq(User::getEmail, user.getEmail());

​      int update = userMapper.update(user, lqw2);

​      return update > 0;

​    } catch (SystemException e) {

​      throw new SystemException(Code.SYSTEM_ERROR, "服务器访问超时，请重试！");

​    }

  }

### 4.2.3 排班管理模块

（一）排班计划的制定与修改

客流规则：默认值为3.8，即每3.8个客流就必须安排至少一个员工当值。

开店规则：默认值为1.5，23.5，即开店一个半小时前需要有员工当值，当值员工数为门店面积除以23.5。

关店规则：默认值2.5,3,13，即关店 2 个半小时内需要有员工当值，当值员工数不小于3并且不小于门店面积除以13。

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/6bb51151-0f3c-4d0b-b4ca-92ab9994167c)


图4.5 排班计划修改界面

核心代码：

import random

def getData():

  file=open('predicData.txt',mode='w')

  x = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5]

  y = [0, 0.1, 1.3, 5.7, 11.1, 13.4, 13.3, 17.3, 18.1, 22.8, 26.9, 21.6, 18.3, 17.2, 15.3, 14.3, 11.6, 8.3, 8.3, 7.2, 5.6, 5.6, 2.5, 2.1, 0.1, 0.1]

  data = []

  month=5

  day=10

  data.append(y)

  for i in range(31):

​    if day%30==0:

​      month=month+1

​      day=day%30

​    day=day+1

​    for j in range(len(y)):

​      n=random.uniform(-3.8,3.8)

​      m=y[j]

​      if m-n<0:

​        x[j]=0

​      else:

​        x[j]=round(m-n,1)

​    s=""

​    for k in x:

​      s=s+(str(k)+",")

​    file.write(s+"\n")

​    data.append(x)

  return data

（二）员工排班的修改

在系统自动生成的排班表中管理员可以手动修改值班人员。

核心代码和效果图如下：

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/9aa2ec8e-0c7a-4d96-bd68-9a09be7a83ea)


图4.6 排班首页界面

核心代码：

public List<List<Map<String, List<User>>>> getScheduleData(String formatDate) throws ParseException {

​    int m = 0;

​    Map<String, Integer> dateMap = DateUtil.getDate(formatDate);

​    int last = dateMap.get("last");

​    //获取客流量预测数据

​    ExecPython execPython = new ExecPython();

​    List<List<Integer>> data = execPython.getData();

​    //门店个数和门店id

​    List<String> storeId = storeService.listObjs(new LambdaQueryWrapper<Store>().select(Store::getId), Object::toString);

​    List<List<Map<String, List<User>>>> storeList = new ArrayList<>();

​    //哪个门店

​    for (int i = 0; i < storeId.size(); i++) {

​      //门店每天的排班

​      List<Map<String, List<User>>> dayList = new ArrayList<>();

​      storeList.add(dayList);

​      //通过值的判断来确定日期

​      int weekNum = dateMap.get("weekday");

​      //一周的时间

​      for (int j = 0; j < last; j++) {

​        if (weekNum >= 7) {

​          weekNum = weekNum % 7;

​        }

​        weekNum++;

​        //门店一天的排班 （2个小时分配，一共6个是时间段）

​        Map<String, List<User>> userMap = new HashMap<>();

​        userMap.put("1", new ArrayList<>());

​        userMap.put("2", new ArrayList<>());

​        userMap.put("3", new ArrayList<>());

​        userMap.put("4", new ArrayList<>());

​        userMap.put("5", new ArrayList<>());

​        userMap.put("6", new ArrayList<>());

​        //提前将每天排班数据存入列表

​        dayList.add(userMap);

​        //规定不同日期的早晚上下限时间点

​        double startTime, endTime;

​        if (weekNum > 0 && weekNum < 6) {

​          startTime = 8; //9

​          endTime = 21;

​        } else {

​          //因为数据预测是从8点开始的，所以周末8点之前的数据我们不进行处理，下面循环直接跳过

​          startTime = 8; //10

​          endTime = 22;

​        }

​        int totalNum[] = new int[data.get(i).size()];

​        for (int k = 0; k < data.get(j).size(); k++) {

​          double total_num = Math.ceil(Double.parseDouble(String.valueOf(data.get(j).get(k))) / 3.8);

​          //工作日的营业时间排班

​          if (weekNum < 6) {

​            if (total_num == 0) {

​              totalNum[k] = 1;

​            } else {

​              totalNum[k] = (int) total_num;

​            }

​          } else {

​            if (startTime < 9) {

​              startTime = startTime + 0.5;

​              continue;

​            } else {

​              if (total_num == 0) {

​                totalNum[k - 2] = 1;

​              } else {

​                totalNum[k - 2] = (int) total_num;

​              }

​            }

​            for (int l = totalNum.length - 2; l < totalNum.length && startTime < endTime; l++, startTime = startTime + 0.5) {

​              totalNum[l] = 1;

​            }

​          }

​          startTime = startTime + 0.5;

​        }

 

​        List<User> pf_userList = userMapper.selectList(new LambdaQueryWrapper<User>()

​            .eq(User::getDay, weekNum).eq(User::getStore, storeId.get(i)));

​        List<User> def_userList = userMapper.selectList(new LambdaQueryWrapper<User>()

​            .isNull(User::getDay).or().ne(User::getDay, weekNum));

 

​        List<List<String>> list = new ArrayList();

​        for (int k = 0; k < pf_userList.size(); k++) {

​          List<String> datetime = Arrays.asList(pf_userList.get(k).getDate().replace("点", "").split("-"));

​          list.add(datetime);

​        }

 

​        List<User> userList3 = new ArrayList<>();

​        int peoples = 0;

​        double n = 8;

​        List<Double> Time = new ArrayList<>();

​        for (int k = 0; k < totalNum.length; k++) {

​          for (int l = 0; l < list.size(); l++) {

​            if (Double.parseDouble(list.get(l).get(0)) == n) {

​              pf_userList.get(l).setDay(j + "");

​              //将分配好的员工添加到对应时间段

​              if (8 <= n && n < 11) {

​                userMap.get("1").add(pf_userList.get(l));

​                 if (pf_userList.get(l).getTime() > 2) {

​                  userMap.get("2").add(pf_userList.get(l));

​                }

​              } else if (11 <= n && n < 13) {

​                userMap.get("2").add(pf_userList.get(l));

​                if (pf_userList.get(l).getTime() > 2) {

​                  userMap.get("3").add(pf_userList.get(l));

​                }

​              } else if (13 <= n && n < 15) {

​                userMap.get("3").add(pf_userList.get(l));

​                if (pf_userList.get(l).getTime() > 2) {

​                  userMap.get("4").add(pf_userList.get(l));

​                 }

​              } else if (15 <= n && n < 17) {

​                userMap.get("4").add(pf_userList.get(l));

​                if (pf_userList.get(l).getTime() > 2) {

​                   userMap.get("5").add(pf_userList.get(l));

​                }

​              } else if (17 <= n && n < 19) {

​                userMap.get("5").add(pf_userList.get(l));

​                 if (pf_userList.get(l).getTime() > 2) {

​                  userMap.get("6").add(pf_userList.get(l));

​                }

​              } else

​                userMap.get("6").add(pf_userList.get(l));

​              peoples++;

​            }

​            if (Double.parseDouble(list.get(l).get(0)) + pf_userList.get(l).getTime() == n) {

​              peoples--;

​            }

​          }

​          for (int l = 0; l < Time.size(); l++) {

​            Time.set(l, Time.get(l) - 0.5);

​            if (Time.get(l) == 0.0) {

​              peoples--;

​            }

​          }

​          while (peoples < totalNum[k]) {

​            for (int s = m; s < def_userList.size(); s++) {

​              if (def_userList.get(s).getTime() == 0)

​                def_userList.get(s).setTime(2);

​              Time.add((double) def_userList.get(s).getTime());

​              def_userList.get(s).setDay("" + k);

​              double endtime = n + def_userList.get(s).getTime();

​              def_userList.get(s).setDate(n + "点-" + endtime + "点");

​              if (8 <= n && n < 11) {

​                userMap.get("1").add(def_userList.get(s));

​                if (def_userList.get(s).getTime() > 2) {

​                  userMap.get("2").add(def_userList.get(s));

​                }

​              } else if (11 <= n && n < 13) {

​                userMap.get("2").add(def_userList.get(s));

​                if (def_userList.get(s).getTime() > 2) {

​                  userMap.get("3").add(def_userList.get(s));

​                }

​              } else if (13 <= n && n < 15) {

​                userMap.get("3").add(def_userList.get(s));

​                if (def_userList.get(s).getTime() > 2) {

​                  userMap.get("4").add(def_userList.get(s));

​                }

​              } else if (15 <= n && n < 17) {

​                userMap.get("4").add(def_userList.get(s));

​                if (def_userList.get(s).getTime() > 2) {

​                  userMap.get("5").add(def_userList.get(s));

​                }

​              } else if (17 <= n && n < 19) {

​                userMap.get("5").add(def_userList.get(s));

​                if (def_userList.get(s).getTime() > 2) {

​                  userMap.get("6").add(def_userList.get(s));

​                }

​              } else

​                userMap.get("6").add(def_userList.get(s));

​              peoples++;

​              break;

​            }

​            m = m + 1;

​            m = m % 26;

​          }

​          n = n + 0.5;

​        }

​      }

​    }

​    return storeList;

  }

### 4.2.4 员工管理模块

（一）添加员工信息

管理员可以通过手动添加和excel表格导入添加员工信息。

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/51624df4-d2f1-4b56-876a-d8527aadf4e4)


图4.7 员工手动添加界面

核心代码：

//手动添加

@Override

  public boolean addUser(User user) {

​    checkInfo(user);

​    try {

​    //正常底层查询 没有逻辑删除过的数据，一旦含有就不能添加

​    if (examine(user)) {

​      return false;

​    }

​    //因为无论 是新来的 还是 复职的，都需要重新更新店铺人数

​    LambdaQueryWrapper<Store> lqw2 = new LambdaQueryWrapper<>();

​    lqw2.eq(Store::getId, user.getStore());

​    Store store = storeMapper.selectOne(lqw2);

​    int number = store.getNumber();

​    store.setNumber(++number);

​    //根据idCard(身份证的唯一性，进行判断)：复职，新招，

​    User user1 = userMapper.checkAddUser(user.getIdCard());

​    //先判断是否逻辑删除？可能性：离职后重新复职，因为逻辑删除的特殊性和数据库字段的限制，需要进行处理

​    if (user1 != null) {

​      if (user.getStore().equals(user1.getStore())) {

​        //复职员工，进行 id复原, 新数据覆盖旧数据的

​        user.setId(user1.getId());

 

​        int x = userMapper.checkUpdateUser1(user);

 

​        if (x > 0) {

​          storeMapper.updateById(store);

​          accountMapper.insert(new Account(user.getEmail(), ("管理员".equals(user.getPosts()))));

​        }

​        return (x > 0);

​      } else {

​        //老员工 复职进入到其他的公司

​        int idSign = store.getIdSign();

​        store.setIdSign(++idSign);

​        user.setId(user.getStore() + idUtil.add(idSign));

​        int x = userMapper.checkUpdateUser2(user);

​        if (x > 0) {

​          storeMapper.updateById(store);

​          accountMapper.insert(new Account(user.getEmail(), ("管理员".equals(user.getPosts()))));

​        }

​        return (x > 0);

​      }

​    } else {

​      //新 进入的员工

​      int idSign = store.getIdSign();

​      store.setIdSign(++idSign);

​      user.setId(user.getStore() + idUtil.add(idSign));

​      int x = userMapper.insert(user);

​      if (x > 0) {

​        storeMapper.updateById(store);

​        accountMapper.insert(new Account(user.getEmail(), ("管理员".equals(user.getPosts()))));

​      }

//      System.out.println("第三种情况：//////////////////////"+(x>0));

​      return (x > 0);

​    }

​    } catch (Exception e) {

​      throw new SystemException(Code.SYSTEM_UNKONW_ERROR, "系统繁忙，请稍后在试！");

​    }

  }

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/5aba32a4-17d9-4f8c-84da-139e747a3749)


图4.8 员工excel添加界面

核心代码：

//EXCEL表格

@Override

  public boolean saveListByExcel(InputStream is, String fileName) throws IOException {

​    try {

​    // 查询 标志 单个字段

​    List<Integer> idSignList = storeService.listObjs(new QueryWrapper<Store>()

​        .lambda().select(Store::getIdSign), function);

​    List<String> idCardList = userMapper.getIdCard();

​    List<String> exitsIdCard = this.listObjs(new QueryWrapper<User>()

​        .lambda().select(User::getIdCard), Object::toString);

​    List<String> storeName = 

storeService.listObjs(new QueryWrapper<Store>()

​        .lambda().select(Store::getName), Object::toString);

​    Map<String, List> listMap = new HashMap<>();

​    listMap.put("idSign", idSignList);    //旧工号标志

​    listMap.put("idCard", idCardList);    //离职的身份证号标识

​    listMap.put("exitsIdCard",exitsIdCard); //现存的身份证号标识

​    listMap.put("storeName",storeName);

​    //调用ExcelUtil时，传入你需要封装的实体类，最终返回封装好的数据和 可能需要更改的资源

​    List<Map> userList = new ExcelUtil(new User())

.AnalysisExcel(is, fileName, listMap);

//      //同时添加账户的信息

​    List<Account> accountList = (List<Account>) userList.get(userList.size() - 1).get("account");

​    List<User> ordUserList = (List<User>) userList.get(userList.size() - 1).get("ordUser");

​    List<Integer> newIdSignList = (List<Integer>) userList.get(userList.size() - 1).get("newIdSign");

​    if (accountList != null) 

userList.remove(userList.size() - 1);

//    //要更改store的人数的numList的数组

​    Map<String, Integer> map = userList.get(userList.size() - 1);

​    if (map != null) userList.remove(userList.size() - 1);

​    List<Store> stores = new ArrayList<>();

​    for (Map.Entry<String, Integer> entry : map.entrySet()) {

​      Store selectOne = 

storeMapper.selectOne(new LambdaQueryWrapper<Store>()

.eq(Store::getName,entry.getKey())

.or().eq(Store::getId, entry.getKey()));

​      if (selectOne != null) {

​        selectOne.setNumber(selectOne.getNumber() + entry.getValue());

​        stores.add(selectOne);

​      }

​      int storeIndex = Integer.parseInt(selectOne.getId().substring(selectOne.getId().length() - 2));

​      selectOne.setIdSign(newIdSignList.get(storeIndex - 1));

​    }

​    boolean res1 = true;

​    if (userList != null && userList.size() > 0) {

​      res1 = this.saveBatch((Collection) userList);

​      if (res1) {

​        res1 = accountService.saveBatch(accountList);

​        res1 = storeService.updateBatchById(stores);

​      }

​    }

​    boolean res2 = true;

​    if (ordUserList != null && ordUserList.size() > 0) {

​      for (int i = 0; i < ordUserList.size(); i++) {

​        res2 = res2 && this.addUser(ordUserList.get(i));

​      }

​    }

​    return res1 && res2;

​    } catch (Exception e) {

​      throw new SystemException(Code.SYSTEM_UNKONW_ERROR, "系统繁忙，请稍后在试！");

​    }

  }

（二）查询、修改、删除员工信息

管理员可以通过条件模糊查询查找对应的员工信息，并对其进行修改删除等操作。

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/b99ccac9-4460-436a-9d8b-9e08bb294260)


图4.9 员工管理界面

核心代码：

@Override

public Page getRecords(int page, String option, String search) {

try {

IPage pages = new Page(page, 7);

LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();

if (option == null || "".equals(option)) {

lqw.select(User::getId, User::getName, User::getPosts, User::getStore, User::getEmail)

.like(search != null && !"".equals(search), User::getName, "%" + search + "%");

} else {

lqw.select(User::getId, User::getName, User::getPosts, User::getStore, User::getEmail)

.eq(User::getStore, option).like(search != null && !"".equals(search),

User::getName, "%" + search + "%");

}

userMapper.selectPage(pages, lqw);

return (Page) pages;

} catch (SystemException e) {

throw new SystemException(Code.SYSTEM_ERROR, "服务器访问超时，请重试！");

}

}

### 4.2.5 门店管理模块

（一）添加、查询、修改、删除门店信息

管理员可以通过条件模糊查询查找对应的门店信息，并对其进行添加、修改和删除等操作。管理员对门店的一系列操作都会生成对应的日志信息。

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/f055dc7d-7149-440d-81f9-753d9608d56f)


图4.10 门店管理界面

核心代码：

//获取其他门店

  @Override

  public List<Store> getOtherAll(String id) {

​    LambdaQueryWrapper<Store> lqw = new LambdaQueryWrapper<>();

​    lqw.ne(Store::getId, id);

​    List<Store> stores = storeMapper.selectList(lqw);

​    return stores;

  }

  @Override

  public boolean addStore(Store store){

​    long count = storeMapper.selectCount(null);

​    store.setId(String.format("hbyt%02d",++count));

​    int insert = storeMapper.insert(store);

​    return insert>0;

  }

  @Override

  public boolean delectStore(String id) {

​    //获取email集合

​    LambdaQueryWrapper<User> user_selectlqw = new LambdaQueryWrapper<>();

​    user_selectlqw.eq(User::getStore, id).select(User::getEmail);

​    List<User> emails = userMapper.selectList(user_selectlqw);

​    //通过email集合删除

​    if(emails!=null){

​      //删除user__info上的数据

​      LambdaQueryWrapper<User> user_delectlqw = new LambdaQueryWrapper<>();

​      user_delectlqw.eq(User::getStore,id);

​      userMapper.delete(user_delectlqw);

​      //删除account和holiday上的数据

​      for(User email:emails){

​        LambdaQueryWrapper<Account> account_delectlqw = new LambdaQueryWrapper<>();

​        LambdaQueryWrapper<Condition> holiday_delectlqw = new LambdaQueryWrapper<>();

​        account_delectlqw.eq(Account::getEmail,email.getEmail());

​        holiday_delectlqw.eq(Condition::getEmail,email.getEmail());

​        accountMapper.delete(account_delectlqw);

​        conditionMapper.delete(holiday_delectlqw);

​      }

​    }

​    //删除门店数据

​    LambdaQueryWrapper<Store> store_delectlqw = new LambdaQueryWrapper<>();

​    store_delectlqw.eq(Store::getId,id);

​    int delect;

​    try {

​      delect = storeMapper.delete(store_delectlqw);

​    }catch (Exception e){

​      throw new SystemException(Code.SAVE_ERR,"系统繁忙");

​    }

​    return delect>0;

  }

  @Override

  public boolean updateStore(Store store) {

​    int update = storeMapper.updateById(store);

​    return update>0;

  }

   @Override

  public Store getStoreByAdmin(String email) {

​    LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();

​    lqw.eq(User::getEmail,email);

​    User user = userMapper.selectOne(lqw);

​    if(user == null){

​      throw new BusinessException(Code.GET_ERR,"没有该管理员");

​    }

​    Store store = storeMapper.selectById(user.getStore());

​    return store;

  }

### 4.2.6 请假管理模块

（1）员工提交请假申请

员工通过填写请假时间、请假类别、概述等信息，向管理员获取请假请求，员工能看见该请求的状态，分别为待批，驳回，批准。

（2）管理员审批请假申请

管理员可以查询员工的请假申请并其进行驳回与批准操作，若超过七天没有审批，则系统默认为驳回操作。

![image](https://github.com/Okap11/intelligent-scheduling/assets/107338618/aa3a8fa4-97a0-482d-aa71-5c2b68806ff9)


图4.11 请假管理界面

核心代码：

@PostMapping("/Save")

  public Result Save(@RequestBody Map<String,Object> map) throws ParseException {

​    ObjectMapper objectMapper=new ObjectMapper();

​    Condition condition=objectMapper.convertValue(map.get("holiday"),Condition.class);

​    if(condition.getType().equals("Rest")){

​      condition.setType("调休");

​    }

​    else if(condition.getType().equals("sick_leave")){

​      condition.setType("病假");

​    }

​    else {

​      condition.setType("事假");

​    }

​    Date date1=sdf.parse(condition.getStartTime());

​    Date date2=sdf.parse(condition.getEndTime());

​    int n= (int) ((date2.getTime()-date1.getTime())/(60*60*1000));

​    condition.setTime(""+(n+1));

​    int x=conditionMapper.insert(condition);

​    int code = x > 0 ? Code.UPDATE_OK:Code.UPDATE_ERR;

​    boolean data = x > 0 ? true :false;

​    String msg = x > 0 ? "插入成功" :"插入失败";

​    Result result = new Result(code,data,msg);

​    return result;

  }

  @RequestMapping("/trans")

  public List<Condition> trans(){

​    //获取调用时间的对象

​    Calendar calendar = Calendar.getInstance();

​    //时间减一周

​    calendar.add(Calendar.WEEK_OF_YEAR, -1);

​    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

​    //时间转字符串

​    String data2 = sdf.format(calendar.getTime());

​    //mybatis-plus的条件判断方法

​    LambdaQueryWrapper<Condition> lqw = new LambdaQueryWrapper<>();

​    lqw.gt(Condition::getStartTime,data2).orderByAsc(Condition::getState);

​    List<Condition> list=conditionMapper.selectList(lqw);

​    return list;

  }

  @PostMapping ("/Update")

  public Result Update(@RequestBody Map<String,Object> map){

​    ObjectMapper objectMapper=new ObjectMapper();

​    Condition holiday=objectMapper.convertValue(map.get("holiday"),Condition.class);

​    int x=conditionMapper.updateById(holiday);

​    int code = x > 0 ? Code.UPDATE_OK:Code.UPDATE_ERR;

​    boolean data = x > 0 ? true :false;

​    String msg = x > 0 ? "修改成功" :"修改失败";

​    Result result = new Result(code,data,msg);

​    return result;

  }

  @GetMapping("/notes/{email}")

  public Result notes(@PathVariable String email){

​    List<Condition> notes = conditionService.getNotes(email);

​    int code = notes == null ?Code.GET_ERR:Code.GET_OK;

​    String msg = notes == null ?"获取失败":"获取成功";

​    return new Result(code,notes,msg);

  }

4.3 本章小结

通过本章的详细设计，我们对系统的各个模块进行了深入的分析和规划，为后续的系统开发和实现提供了具体的指导。在下一阶段的系统实现中，我们将根据本章的详细设计，逐步开发和测试系统的各个模块，以实现一个功能完善、稳定可靠的智能排班系统。

 
