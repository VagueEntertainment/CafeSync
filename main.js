function create_db() {

    console.log("Checking databases")
db.transaction(function (tx) {
    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Card(id TEXT, name TEXT,phone TEXT,email TEXT,company TEXT,alias TEXT, motto TEXT, main TEXT,website1 TEXT,website2 TEXT,website3 TEXT,website4 TEXT,avatar TEXT,cardback TEXT,cat TEXT)')
    tx.executeSql('CREATE TABLE IF NOT EXISTS YourCard(id TEXT, cardNum TEXT)')
    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Options(id TEXT, sendcard TEXT, alias TEXT, contact TEXT)')
    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS ContactInfo(contactid TEXT, information TEXT,type TEXT)')
    tx.executeSql('CREATE TABLE IF NOT EXISTS Settings(id TEXT, value INT)')
    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Themes(id TEXT, backgroundColor TEXT, highLightColor TEXT, seperatorColor TEXT, barColor TEXT, activeColor TEXT, cardcolor TEXT, overlayColor TEXT, fontColorTitle TEXT, fontColor TEXT)')
    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Stats(id TEXT, name TEXT,data TEXT, frequency INT)')

    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS TempCards(id INT UNIQUE, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT,main TEXT,website1 TEXT,website2 TEXT,website3 TEXT,website4 TEXT,avatar TEXT, cardback TEXT,stamp INT,cat TEXT,cardsop INT)')
    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS RegCards(id INT UNIQUE, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT,main TEXT,website1 TEXT,website2 TEXT,website3 TEXT,website4 TEXT,avatar TEXT, cardback TEXT,stamp INT,cat TEXT,cardsop INT)')
    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS SavedCards(id INT UNIQUE, name TEXT,phone TEXT,email TEXT,company TEXT,alias TEXT, motto TEXT,main TEXT,website1 TEXT,website2 TEXT,website3 TEXT,website4 TEXT,avatar TEXT, cardback TEXT,cat TEXT,cardsop INT)')
    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS GlobCards(id INT UNIQUE, name TEXT, phone TEXT, email TEXT,company TEXT,alias TEXT, motto TEXT,main TEXT,website1 TEXT,website2 TEXT,website3 TEXT,website4 TEXT,avatar TEXT, cardback TEXT,stamp INT,cat TEXT,cardsop INT)')

    tx.executeSql(
                'CREATE TABLE IF NOT EXISTS LIBRARY (id TEXT,thedir TEXT,file TEXT,thedate TEXT,private INT,picture_index INT, base64 BLOB)')


    tx.executeSql('CREATE TABLE IF NOT EXISTS NEWS (date TEXT)');

    tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (contactid TEXT,title MEDIUMTEXT ,information MEDIUMTEXT,date MEDIUMINT,origin MEDIUMINT)');

     tx.executeSql('CREATE TABLE IF NOT EXISTS announcements (id TEXT, name TEXT,type TEXT,version INT,seen INT)');
});

}

function save_card(id, username, userphone, useremail, usercompany, useralias, usermotto, main, website1, website2, website3, website4, sendcard, usealias, contact, avatar, cardback, cardcat, cardindex) {

    if (usercompany === "") {
        usercompany = " "
    }

    if (main === "") {
        main = " "
    }
    if (website1 === "") {
        website1 = " "
    }
    if (website2 === "") {
        website2 = " "
    }
    if (website3 === "") {
        website3 = " "
    }
    if (website4 === "") {
        website4 = " "
    }
    if (usermotto === "") {
        usermotto = " "
    }
    if (useremail === "") {
        useremail = " "
    }
    if (userphone === "") {
        userphone = " "
    }
    if (useralias === "") {
        useralias = " "
    }
    if (cardback === "") {
        cardback = "./img/default_card.png"
    }

    usermotto = usermotto.replace(/\'/g, "&#x27;")
    username = username.replace(/\'/g, "&#x27;")
    usercompany = usercompany.replace(/\'/g, "&#x27;")
    useralias = useralias.replace(/\'/g, "&#x27;")

    var userStr = "INSERT INTO Card VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    var ycStr = "INSERT INTO YourCard VALUES(?,?)"

    var data = [id, username, userphone, useremail, usercompany, useralias, usermotto, main, website1, website2, website3, website4, avatar, cardback, cardcat]
    var data1 = [id, cardindex]

    var testStr = "SELECT  * FROM Card WHERE id= '" + id + "'"
    var testStr1 = "SELECT * FROM YourCard WHERE id= '" + id + "'"

    var updateUser = "UPDATE Card SET name='" + username + "', email='" + useremail + "', phone='"
            + userphone + "', company='" + usercompany + "', alias='"
            + useralias + "', motto='" + usermotto + "', main='"
            + main + "',website1='" + website1 + "', website2='"
            + website2 + "', website3='" + website3 + "', website4='"
            + website4 + "', avatar='" + avatar + "', cardback='"
            + cardback + "', cat='" + cardcat + "'  WHERE id='" + id + "'"

    var updateYC = "UPDATE YourCard SET cardNum='" + cardindex + "'"

    db.transaction(function (tx) {

        var test = tx.executeSql(testStr)
        var test1 = tx.executeSql(testStr1)

        if (test.rows.length === 0) {

            if (userid != "") {

                tx.executeSql(userStr, data)
            }
        } else {
            if (userid != "") {
                tx.executeSql(updateUser)
            }
        }

        if (test1.rows.length === 0) {

            if (userid != "") {

                tx.executeSql(ycStr, data1)
            }
        } else {
            if (userid != "") {
                tx.executeSql(updateYC)
            }
        }
    })
    var settingStr = "INSERT INTO Options VALUES(?,?,?,?)"
    var settingdata = [id, sendcard, usealias, contact]

    var OptStr = "SELECT  *  FROM Options WHERE id= '" + id + "'"

    var updateOptions = "UPDATE Options SET sendcard ='" + sendcard + "',alias='"
            + usealias + "',contact='" + contact + "' WHERE id='" + id + "'"

    db.transaction(function (tx) {

        var test = tx.executeSql(OptStr)
        if (test.rows.length === 0) {

            if (userid != "") {
                tx.executeSql(settingStr, settingdata)
            }
        } else {
            if (userid != "") {
                tx.executeSql(updateOptions)
            }
        }
    })

    return 1
}

function load_Card() {

    console.log("Loading Card")

    var dataStr = "SELECT * FROM Card WHERE 1"

    db.transaction(function (tx) {

        var pull = tx.executeSql(dataStr)

        if (pull.rows.length === 1) {

            //standard info card 1 //

            userid = pull.rows.item(0).id
            username = pull.rows.item(0).name.replace(/&#x27;/g, "'")
            useremail = pull.rows.item(0).email
            userphone = pull.rows.item(0).phone
            usercompany = pull.rows.item(0).company.replace(/&#x27;/g, "'")
            useralias = pull.rows.item(0).alias.replace(/&#x27;/g, "'")
            usermotto = pull.rows.item(0).motto.replace(/&#x27;/g, "'")
            website1 = pull.rows.item(0).website1
            website2 = pull.rows.item(0).website2
            website3 = pull.rows.item(0).website3

            avimg = pull.rows.item(0).avatar
            cardbImg = pull.rows.item(0).cardback

            if (cardbImg.search("internal:") == -1) {
                cardbImg = cardbImg
            } else {
                carddesign = pull.rows.item(0).cardback

                var sets = cardbImg.slice(9, cardbImg.length)

                fbgnum = sets.split(",")[0]
                fsymbolnum = sets.split(",")[1]
                ftextnum = sets.split(",")[2]
                cardbImg = card_Set("background", fbgnum)
                cardsImg = card_Set("symbol", fsymbolnum)
                cardtplace = card_Set("text", ftextnum)
            }

            if (pull.rows.item(0).cat === null) {
                usercat = " "
            } else {
                usercat = pull.rows.item(0).cat
            }
            if (pull.rows.item(0).website4 === null) {
                website4 = " "
            } else {
                website4 = pull.rows.item(0).website4
            }
            if (pull.rows.item(0).main === null) {
                usermain = " "
            } else {
                usermain = pull.rows.item(0).main
            }

            return 1
        } else {
            firstrun.state = "Active"
            mainView.visible = true
            return 0
        }
    })
    if (userid > 3) {
        console.log("something is wrong launching firstrun")
        firstrun.state = "Active"
    }

    var cardStr = "SELECT * FROM Options WHERE 1"
    var test = ""
    db.transaction(function (tx) {

        var pull = tx.executeSql(cardStr)
        if (pull.rows.length > 0) {

            stf = torf(pull.rows.item(0).sendcard)
            atf = torf(pull.rows.item(0).alias)
            ctf = torf(pull.rows.item(0).contact)

            cardloaded = 1
        } else {
            cardloaded = 0
        }
    })

    var cardStr1 = "SELECT * FROM YourCard WHERE 1"
    var test1 = ""
    db.transaction(function (tx) {

        var pull = tx.executeSql(cardStr1)
        if (pull.rows.length > 0) {

            usercardNum = pull.rows.item(0).cardNum

            cardloaded = 1

            connect.start()
        } else {
            connect.start()
            cardloaded = 0
        }
    })

    // System Settings more may need to be added later, but for now this is what works //
    db.transaction(function (tx) {

        var CD = "SELECT * FROM Settings WHERE id='searchDistance'"
        var CS = "SELECT * FROM Settings WHERE id='tempSupress'"
        var CKT = "SELECT * FROM Settings WHERE id='keepTemp'"
        var CT = "SELECT * FROM Settings WHERE id='theme'"

        var CCM = "SELECT * FROM Settings WHERE id='CM'"
        var CFM = "SELECT * FROM Settings WHERE id='FM'"
        var CMM = "SELECT * FROM Settings WHERE id='MM'"

        var checkDistance = tx.executeSql(CD)
        var checkSupress = tx.executeSql(CS)
        var checkKeepTemp = tx.executeSql(CKT)

        var checkChanceMeetings = tx.executeSql(CCM)
        var checkFrequenTMeetings = tx.executeSql(CFM)
        var checkMissedMeetings = tx.executeSql(CMM)

        var checkTheme = tx.executeSql(CT)

        if (checkDistance.rows.length > 0) {
            sD = checkDistance.rows.item(0).value
        } else {
            tx.executeSql("INSERT INTO Settings VALUES(?,?)",
                          ["searchDistance", sD])
        }
        if (checkSupress.rows.length > 0) {
            sT = checkSupress.rows.item(0).value
        } else {
            tx.executeSql("INSERT INTO Settings VALUES(?,?)",
                          ["tempSupress", sT])
        }
        if (checkKeepTemp.rows.length > 0) {
            kT = checkKeepTemp.rows.item(0).value
        } else {
            tx.executeSql("INSERT INTO Settings VALUES(?,?)", ["keepTemp", kT])
        }

        if (checkChanceMeetings.rows.length > 0) {
            cM = checkChanceMeetings.rows.item(0).value
        } else {
            tx.executeSql("INSERT INTO Settings VALUES(?,?)", ["CM", cM])
        }
        if (checkFrequenTMeetings.rows.length > 0) {
            fM = checkFrequenTMeetings.rows.item(0).value
        } else {
            tx.executeSql("INSERT INTO Settings VALUES(?,?)", ["FM", fM])
        }
        if (checkMissedMeetings.rows.length > 0) {
            mM = checkMissedMeetings.rows.item(0).value
        } else {
            tx.executeSql("INSERT INTO Settings VALUES(?,?)", ["MM", mM])
        }

        if (checkTheme.rows.length > 0) {
            theme = checkTheme.rows.item(0).value
        } else {
            tx.executeSql("INSERT INTO Settings VALUES(?,?)", ["theme", theme])
        }
    })

    db.transaction(function (tx) {

        var theplace = "INSERT INTO Themes VALUES(?,?,?,?,?,?,?,?,?,?)"
        var theme0 = ["default", "#F9F9F9", "#FDF3E1", "#795548", "#FAFAF5", "#FDF3E1", "#FAFAFA", "#795548", "black", "black"]
        var theme1 = ["pink", "#F9E6E6", "#FCF2E1", "#77564B", "#F8AEAE", "#FCF2E1", "#FAF3F3", "#77564B", "black", "black"]
        var theme2 = ["PoP", "#24282A", "#48B9C7", "#FAA41A", "#3B3633", "#E88937", "#3B3633", "#FFFFFF", "#FAFAFA", "#FAFAFA"]

        var check1 = tx.executeSql("SELECT * FROM Themes WHERE id='default'")
        var check2 = tx.executeSql("SELECT * FROM Themes WHERE id='pink'")
        var check3 = tx.executeSql("SELECT * FROM Themes WHERE id='PoP'")

        if (check1.rows.length !== 1) {
            tx.executeSql(theplace, theme0)
        }

        if (check2.rows.length !== 1) {
            tx.executeSql(theplace, theme1)
        }

        if (check3.rows.length !== 1) {
            tx.executeSql(theplace, theme2)
        }

        switch (theme) {
        case 0:
            if (check1.rows.length === 1) {
                backgroundColor = check1.rows.item(0).backgroundColor
                highLightColor1 = check1.rows.item(0).highLightColor
                seperatorColor1 = check1.rows.item(0).seperatorColor
                barColor = check1.rows.item(0).barColor
                activeColor = check1.rows.item(0).activeColor
                cardcolor = check1.rows.item(0).cardcolor
                overlayColor = check1.rows.item(0).overlayColor
                fontColorTitle = check1.rows.item(0).fontColorTitle
                fontColor = check1.rows.item(0).fontColor
            }
            break
        case 1:
            if (check2.rows.length === 1) {
                backgroundColor = check2.rows.item(0).backgroundColor
                highLightColor1 = check2.rows.item(0).highLightColor
                seperatorColor1 = check2.rows.item(0).seperatorColor
                barColor = check2.rows.item(0).barColor
                activeColor = check2.rows.item(0).activeColor
                cardcolor = check2.rows.item(0).cardcolor
                overlayColor = check2.rows.item(0).overlayColor
                fontColorTitle = check2.rows.item(0).fontColorTitle
                fontColor = check2.rows.item(0).fontColor
            }
            break
        case 2:
            if (check3.rows.length === 1) {
                backgroundColor = check3.rows.item(0).backgroundColor
                highLightColor1 = check3.rows.item(0).highLightColor
                seperatorColor1 = check3.rows.item(0).seperatorColor
                barColor = check3.rows.item(0).barColor
                activeColor = check3.rows.item(0).activeColor
                cardcolor = check3.rows.item(0).cardcolor
                overlayColor = check3.rows.item(0).overlayColor
                fontColorTitle = check3.rows.item(0).fontColorTitle
                fontColor = check3.rows.item(0).fontColor
            }
            break
        }
    })

    // End System Settings //
    if (username.length < 1) {

        if (usercompany.length < 1) {

            selection = 0
            cardPage.state = "settings"
            mainScreen.state = "InActive"

            topBar.state = "Wizard"
        }
    }
    mainView.visible = true
}

function temp_Load(search, locale, sortOpt) {

    var dbtable = ""
    switch (locale) {
    case "temp":
        dbtable = "TempCards"
        break
    case "region":
        dbtable = "RegCards"
        break
    case "global":
        dbtable = "GlobCards"
        break
    default:
        dbtable = "TempCards"
        break
    }

    var Sort = ""
    switch (sortOpt) {
    case 1:
        Sort = "name ASC"
        break
    case 2:
        Sort = "company ASC"
        break
    case 3:
        Sort = "cat ASC"
        break
    default:
        Sort = "stamp DESC"
        break
    }

    var dataStr = ""

    if (search !== "") {

        dataStr = "SELECT * FROM " + dbtable + " WHERE (name LIKE '%" + search
                + "%' OR company LIKE '%" + search + "%' OR motto LIKE '%#"
                + search + "%') ORDER BY " + Sort
    } else {
        dataStr = "SELECT * FROM " + dbtable + " WHERE 1 ORDER BY " + Sort
    }

    db.transaction(function (tx) {

        var pull = tx.executeSql(dataStr)
        numofcards = pull.rows.length
        var record = 0
        while (pull.rows.length > record) {

            var c
            var n
            var p
            var e
            var cp

            var testStr = "SELECT  *  FROM SavedCards WHERE id= " + pull.rows.item(
                        record).id
            var duplicate = 0

            var savecheck = tx.executeSql(testStr)
            var previousdate
            var datecollected = "SELECT  *  FROM Stats WHERE id= '" + pull.rows.item(
                        record).id + "' AND name ='lastseen'"

            var date = tx.executeSql(datecollected)
            var humanDate = ""
            if (pull.rows.item(record).stamp.length > 10) {
                humanDate = new Date(pull.rows.item(record).stamp)
            } else {
                humanDate = new Date(pull.rows.item(record).stamp * 1000)
            }

            if (pull.rows.item(record).id !== usercardNum) {

                switch (sortOpt) {
                case 1:
                    if (previousdate !== pull.rows.item(record).name[0]) {
                        previousdate = pull.rows.item(record).name[0]
                        cardslist.append({
                                             type: 9,
                                             date: pull.rows.item(
                                                       record).name[0]
                                         })
                    }
                    break
                case 2:
                    if (previousdate !== pull.rows.item(record).company[0]) {
                        previousdate = pull.rows.item(record).company[0]
                        cardslist.append({
                                             type: 9,
                                             date: pull.rows.item(
                                                       record).company[0]
                                         })
                    }
                    break
                case 3:
                    if (previousdate !== pull.rows.item(record).cat) {
                        previousdate = pull.rows.item(record).cat
                        cardslist.append({
                                             type: 9,
                                             date: pull.rows.item(record).cat
                                         })
                    }
                    break
                default:
                    if (previousdate !== pull.rows.item(record).stamp) {
                        previousdate = pull.rows.item(record).stamp
                        cardslist.append({
                                             type: 9,
                                             date: humanDate.toLocaleDateString(
                                                       )
                                         })
                    }
                    break
                }
            }

            if (duplicate == 0 && pull.rows.item(record).id !== 'undefined') {
                var w1 = ""
                var w2 = ""
                var w3 = ""
                var w4 = ""
                var main = ""

                var card
                var symbol
                var text
                var design

                var ava

                cardsynctemp = pull.rows.item(record).id + "," + cardsynctemp

                if (pull.rows.item(record).website1 !== 'undefined') {
                    switch (pull.rows.item(record).website1.substring(0, 4)) {
                    case "http":
                        w1 = pull.rows.item(record).website1
                        break
                    case "HTTP":
                        w1 = pull.rows.item(record).website1
                        break
                    case "Http":
                        w1 = pull.rows.item(record).website1
                        break
                    default:
                        w1 = "http://" + pull.rows.item(record).website1
                        break
                    }
                } else {
                    w1 = ""
                }

                if (pull.rows.item(record).website2 !== 'undefined') {
                    switch (pull.rows.item(record).website2.substring(0, 4)) {
                    case "http":
                        w2 = pull.rows.item(record).website2
                        break
                    case "HTTP":
                        w2 = pull.rows.item(record).website2
                        break
                    case "Http":
                        w2 = pull.rows.item(record).website2
                        break
                    default:
                        w2 = "http://" + pull.rows.item(record).website2
                        break
                    }
                } else {
                    w2 = ""
                }

                if (pull.rows.item(record).website3 !== 'undefined') {
                    switch (pull.rows.item(record).website3.substring(0, 4)) {
                    case "http":
                        w3 = pull.rows.item(record).website3
                        break
                    case "HTTP":
                        w3 = pull.rows.item(record).website3
                        break
                    case "Http":
                        w3 = pull.rows.item(record).website3
                        break
                    default:
                        w3 = "http://" + pull.rows.item(record).website3
                        break
                    }
                } else {
                    w3 = ""
                }

                if (pull.rows.item(record).website4 !== 'undefined') {
                    switch (pull.rows.item(record).website4.substring(0, 4)) {
                    case "http":
                        w4 = pull.rows.item(record).website4
                        break
                    case "HTTP":
                        w4 = pull.rows.item(record).website4
                        break
                    case "Http":
                        w4 = pull.rows.item(record).website4
                        break
                    default:
                        w4 = "http://" + pull.rows.item(record).website4
                        break
                    }
                } else {
                    w4 = ""
                }

                if (pull.rows.item(record).main !== 'undefined') {
                    switch (pull.rows.item(record).main.substring(0, 4)) {
                    case "http":
                        main = pull.rows.item(record).main
                        break
                    case "HTTP":
                        main = pull.rows.item(record).main
                        break
                    case "Http":
                        main = pull.rows.item(record).main
                        break
                    default:
                        main = "http://" + pull.rows.item(record).main
                        break
                    }
                } else {
                    main = ""
                }

                if (pull.rows.item(record).avatar.length < 4) {
                    ava = "img/default_avatar.png"
                } else {
                    ava = pull.rows.item(record).avatar
                    if (ava.search("/9j/4A") !== -1) {
                        ava = "data:image/jpeg;base64, " + ava.replace(/ /g,
                                                                       "+")
                    }
                }

                var spC = seperatorColor1

                for (var num = 0; num < category_list.split(
                         ",").length; num = num + 1) {

                    if (pull.rows.item(record).cat === category_list.split(
                                ",")[num].split("::")[0]) {

                        if (category_list.split(",")[num].split(
                                    "::")[1] !== "none") {
                            spC = category_list.split(",")[num].split("::")[1]
                        } else {
                            spC = seperatorColor1
                        }
                    }
                }

                if (currentcat.length > 2 & currentcat !== qsTr("All Cards")) {

                    if (currentcat === pull.rows.item(record).cat) {

                        // console.log(currentlist.split(":"));
                        if (currentlist != "") {
                            if (currentlist.search(":" + pull.rows.item(
                                                       record).id) == -1) {
                                currentlist = currentlist + ":" + pull.rows.item(
                                            record).id
                            }
                        } else {
                            currentlist = ":" + pull.rows.item(record).id
                        }

                        if (pull.rows.item(record).name !== 'undefined') {
                            n = pull.rows.item(record).name.replace(/&#x27;/g,
                                                                    "'")
                        } else {
                            n = ""
                        }

                        if (pull.rows.item(record).company !== 'undefined') {
                            c = pull.rows.item(record).company.replace(
                                        /&#x27;/g, "'")
                        } else {
                            c = ""
                        }

                        if (pull.rows.item(record).phone !== 'undefined') {
                            p = pull.rows.item(record).phone
                        } else {
                            p = ""
                        }

                        if (pull.rows.item(record).email !== 'undefined') {
                            e = pull.rows.item(record).email
                        } else {
                            e = ""
                        }

                        if (pull.rows.item(record).alias !== 'undefined') {
                            cp = pull.rows.item(record).alias
                        } else {
                            cp = ""
                        }

                        if (pull.rows.item(record).id !== usercardNum) {

                            cardslist.append({
                                                 type: 0,
                                                 name: n,
                                                 colorCode: "white",
                                                 imagesource: "img/default_avatar.png",
                                                 company: c,
                                                 phone: p,
                                                 email: e,
                                                 cardposition: cp,
                                                 motto: pull.rows.item(
                                                            record).motto.replace(
                                                            /&#x27;/g, "'"),
                                                 cardId: pull.rows.item(
                                                             record).id.toString(
                                                             ),
                                                 mainsite: main,
                                                 URL1: w1,
                                                 URL2: w2,
                                                 URL3: w3,
                                                 URL4: w4,
                                                 spColor: spC,
                                                 cardStatus: "",
                                                 connection: parseInt(
                                                                 get_contact_info(
                                                                     pull.rows.item(
                                                                         record).id.toString(
                                                                         ),
                                                                     "relation")),
                                                 cardb: pull.rows.item(
                                                            record).cardback,
                                                 cardcat: pull.rows.item(
                                                              record).cat,
                                                 imgsource: ava,
                                                 cardsop: pull.rows.item(
                                                              record).cardsop,
                                                 saved: savecheck.rows.length
                                             })
                        } else {
                            usercard = pull.rows.item(record).id.toString()
                        }
                    }
                } else {

                    if (currentlist != "") {

                        if (currentlist.search(":" + pull.rows.item(
                                                   record).id) == -1) {
                            currentlist = currentlist + ":" + pull.rows.item(
                                        record).id
                        }
                    } else {
                        currentlist = ":" + pull.rows.item(record).id
                    }

                    if (pull.rows.item(record).id !== usercardNum) {

                        if (pull.rows.item(record).name !== 'undefined') {
                            n = pull.rows.item(record).name.replace(/&#x27;/g,
                                                                    "'")
                        } else {
                            n = ""
                        }

                        if (pull.rows.item(record).company !== 'undefined') {
                            c = pull.rows.item(record).company.replace(
                                        /&#x27;/g, "'")
                        } else {
                            c = ""
                        }

                        if (pull.rows.item(record).phone !== 'undefined') {
                            p = pull.rows.item(record).phone
                        } else {
                            p = ""
                        }

                        if (pull.rows.item(record).email !== 'undefined') {
                            e = pull.rows.item(record).email
                        } else {
                            e = ""
                        }

                        if (pull.rows.item(record).alias !== 'undefined') {
                            cp = pull.rows.item(record).alias
                        } else {
                            cp = ""
                        }

                        cardslist.append({
                                             type: 0,
                                             name: n,
                                             colorCode: "white",
                                             imagesource: "img/default_avatar.png",
                                             company: c,
                                             phone: p,
                                             email: e,
                                             cardposition: cp,
                                             motto: pull.rows.item(
                                                        record).motto.replace(
                                                        /&#x27;/g, "'"),
                                             cardId: pull.rows.item(
                                                         record).id.toString(),
                                             mainsite: main,
                                             URL1: w1,
                                             URL2: w2,
                                             URL3: w3,
                                             URL4: w4,
                                             spColor: spC,
                                             cardStatus: "",
                                             connection: parseInt(
                                                             get_contact_info(
                                                                 pull.rows.item(
                                                                     record).id.toString(
                                                                     ),
                                                                 "relation")),
                                             cardcat: pull.rows.item(
                                                          record).cat,
                                             imgsource: ava,
                                             cardb: pull.rows.item(
                                                        record).cardback,
                                             cardsop: pull.rows.item(
                                                          record).cardsop,
                                             saved: savecheck.rows.length
                                         })
                    } else {
                        usercard = pull.rows.item(record).id.toString()
                    }
                }
            }

            record = record + 1
        }
    })
}

function cards_Save(id, username, userphone, useremail, usercompany, useralias, usermotto, main, website1, website2, website3, website4, avatar, cardback, cardcat, cardsop) {

    var userStr = "INSERT INTO SavedCards VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    var data = [id, username, userphone, useremail, usercompany, useralias, usermotto, main, website1, website2, website3, website4, avatar, cardback, cardcat, cardsop]

    console.log(data)
    db.transaction(function (tx) {

        if (id.length !== 0) {
            tx.executeSql(userStr, data)
        }
    })
    cardsyncsaved = id + "," + cardsyncsaved
    return 1
}

function cards_Load(search, sortOpt) {

    var dataStr = ""
    cardsyncsaved = ""

    var Sort = ""

    switch (sortOpt) {
    case 1:
        Sort = "name DESC"
        break
    case 2:
        Sort = "company ASC"
        break
    case 3:
        Sort = "cat ASC"
        break
    default:
        Sort = "name ASC"
        break
    }

    if (search.length > 0) {
        dataStr = "SELECT * FROM SavedCards WHERE (name LIKE '%" + search + "%' OR company LIKE '%"
                + search + "%' OR motto LIKE '%#" + search + "%') ORDER By " + Sort
    } else {
        dataStr = "SELECT * FROM SavedCards WHERE 1 ORDER By " + Sort
    }

    db.transaction(function (tx) {

        var pull = tx.executeSql(dataStr)
        var previousdate

        var record = 0
        while (pull.rows.length > record) {

            if (pull.rows.item(record).id > 1) {

                if (pull.rows.item(record).id !== usercardNum) {

                    switch (sortOpt) {
                    case 1:
                        if (previousdate !== pull.rows.item(record).name[0]) {
                            previousdate = pull.rows.item(record).name[0]
                            cardslist.append({
                                                 type: 9,
                                                 date: pull.rows.item(
                                                           record).name[0]
                                             })
                        }
                        break
                    case 2:
                        if (previousdate !== pull.rows.item(
                                    record).company[0]) {
                            previousdate = pull.rows.item(record).company[0]
                            cardslist.append({
                                                 type: 9,
                                                 date: pull.rows.item(
                                                           record).company[0]
                                             })
                        }
                        break
                    case 3:
                        if (previousdate !== pull.rows.item(record).cat) {
                            previousdate = pull.rows.item(record).cat
                            cardslist.append({
                                                 type: 9,
                                                 date: pull.rows.item(
                                                           record).cat
                                             })
                        }
                        break
                    default:
                        if (previousdate !== pull.rows.item(record).name[0]) {
                            previousdate = pull.rows.item(record).name[0]
                            cardslist.append({
                                                 type: 9,
                                                 date: pull.rows.item(
                                                           record).name[0]
                                             })
                        }
                        break
                    }
                }

                cardsyncsaved = pull.rows.item(record).id + "," + cardsyncsaved

                var w1 = ""
                var w2 = ""
                var w3 = ""
                var w4 = ""
                var main = ""
                var card
                var ava = ""
                var symbol
                var text

                var c
                var n
                var p
                var e
                var cp

                if (pull.rows.item(record).website1 !== 'undefined') {
                    switch (pull.rows.item(record).website1.substring(0, 4)) {
                    case "http":
                        w1 = pull.rows.item(record).website1
                        break
                    case "HTTP":
                        w1 = pull.rows.item(record).website1
                        break
                    case "Http":
                        w1 = pull.rows.item(record).website1
                        break
                    default:
                        w1 = "http://" + pull.rows.item(record).website1
                        break
                    }
                } else {
                    w1 = ""
                }

                if (pull.rows.item(record).website2 !== 'undefined') {
                    switch (pull.rows.item(record).website2.substring(0, 4)) {
                    case "http":
                        w2 = pull.rows.item(record).website2
                        break
                    case "HTTP":
                        w2 = pull.rows.item(record).website2
                        break
                    case "Http":
                        w2 = pull.rows.item(record).website2
                        break
                    default:
                        w2 = "http://" + pull.rows.item(record).website2
                        break
                    }
                } else {
                    w2 = ""
                }

                if (pull.rows.item(record).website3 !== 'undefined') {
                    switch (pull.rows.item(record).website3.substring(0, 4)) {
                    case "http":
                        w3 = pull.rows.item(record).website3
                        break
                    case "HTTP":
                        w3 = pull.rows.item(record).website3
                        break
                    case "Http":
                        w3 = pull.rows.item(record).website3
                        break
                    default:
                        w3 = "http://" + pull.rows.item(record).website3
                        break
                    }
                } else {
                    w3 = ""
                }

                if (pull.rows.item(record).website4 !== 'undefined') {
                    switch (pull.rows.item(record).website4.substring(0, 4)) {
                    case "http":
                        w4 = pull.rows.item(record).website4
                        break
                    case "HTTP":
                        w4 = pull.rows.item(record).website4
                        break
                    case "Http":
                        w4 = pull.rows.item(record).website4
                        break
                    default:
                        w4 = "http://" + pull.rows.item(record).website4
                        break
                    }
                } else {
                    w4 = ""
                }

                if (pull.rows.item(record).main !== 'undefined') {
                    switch (pull.rows.item(record).main.substring(0, 4)) {
                    case "http":
                        main = pull.rows.item(record).main
                        break
                    case "HTTP":
                        main = pull.rows.item(record).main
                        break
                    case "Http":
                        main = pull.rows.item(record).main
                        break
                    default:
                        main = "http://" + pull.rows.item(record).main
                        break
                    }
                } else {
                    main = ""
                }

                if (pull.rows.item(record).cardback.search(
                            "internal:") === -1) {
                    if (pull.rows.item(record).cardback.length < 4) {

                        card = "img/default_card.png"
                    } else {
                        card = pull.rows.item(record).cardback
                    }
                } else {

                    var sets = pull.rows.item(record).cardback.slice(
                                9, pull.rows.item(record).cardback.length)
                    var fbnum = sets.split(",")[0]
                    var fsnum = sets.split(",")[1]
                    var ftnum = sets.split(",")[2]
                }

                var spC = seperatorColor1

                for (var num = 0; num < category_list.split(
                         ",").length; num = num + 1) {

                    if (pull.rows.item(record).cat === category_list.split(
                                ",")[num].split("::")[0]) {

                        if (category_list.split(",")[num].split(
                                    "::")[1] !== "none") {
                            spC = category_list.split(",")[num].split("::")[1]
                        } else {
                            spC = seperatorColor1
                        }
                    }
                }

                var carddup = 0

                if (pull.rows.item(record).name.replace(/&#x27;/g,
                                                        "'") === username) {
                    carddup++
                } else {
                    carddup--
                }
                if (pull.rows.item(record).alias !== useralias) {
                    carddup++
                } else {
                    carddup--
                }
                if (pull.rows.item(record).company.replace(
                            /&#x27;/g, "'") === usercompany) {
                    carddup++
                } else {
                    carddup--
                }

                if (pull.rows.item(record).avatar.length < 4) {
                    ava = "img/default_avatar.png"
                } else {

                    ava = pull.rows.item(record).avatar
                    if (ava.search("/9j/4A") != -1) {
                        if (ava.startsWith(
                                    "data:image/jpeg;base64") === false) {
                            ava = "data:image/jpeg;base64, " + ava.replace(
                                        / /g, "+")
                        } else {
                            ava = ava
                        }
                    }
                }

                if (pull.rows.item(record).name !== 'undefined') {
                    n = pull.rows.item(record).name.replace(/&#x27;/g, "'")
                } else {
                    n = " "
                }

                if (pull.rows.item(record).company !== 'undefined') {
                    c = pull.rows.item(record).company.replace(/&#x27;/g, "'")
                } else {
                    c = " "
                }

                if (pull.rows.item(record).phone !== 'undefined') {
                    p = pull.rows.item(record).phone
                } else {
                    p = " "
                }

                if (pull.rows.item(record).email !== 'undefined') {
                    e = pull.rows.item(record).email
                } else {
                    e = " "
                }

                if (pull.rows.item(record).alias !== 'undefined') {
                    cp = pull.rows.item(record).alias
                } else {
                    cp = " "
                }

                if (pull.rows.item(record).id !== usercardNum) {

                    if (currentcat.length > 2 & currentcat !== qsTr(
                                "All Cards")) {

                        if (currentcat === pull.rows.item(record).cat) {

                            cardslist.append({
                                                 type: 0,
                                                 name: n,
                                                 colorCode: "white",
                                                 imagesource: "img/default_avatar.png",
                                                 cardback: "img/default_card.png",
                                                 company: c,
                                                 phone: p,
                                                 email: e,
                                                 motto: pull.rows.item(
                                                            record).motto.replace(
                                                            /&#x27;/g, "'"),
                                                 cardId: pull.rows.item(
                                                             record).id.toString(
                                                             ),
                                                 mainsite: main,
                                                 URL1: w1,
                                                 URL2: w2,
                                                 URL3: w3,
                                                 URL4: w4,
                                                 spColor: spC,
                                                 cardStatus: "",
                                                 connection: parseInt(
                                                                 get_contact_info(
                                                                     pull.rows.item(
                                                                         record).id.toString(
                                                                         ),
                                                                     "relation")),
                                                 cardback: card,
                                                 cardsymbol: symbol,
                                                 cardtext: text,
                                                 cardcat: pull.rows.item(
                                                              record).cat,
                                                 imgsource: ava,
                                                 thedesign: pull.rows.item(
                                                                record).cardback,
                                                 cardsop: pull.rows.item(
                                                              record).cardsop,
                                                 saved: 1
                                             })
                        }
                    } else {

                        cardslist.append({
                                             type: 0,
                                             name: n,
                                             colorCode: "white",
                                             imagesource: "img/default_avatar.png",
                                             cardback: "img/default_card.png",
                                             company: c,
                                             cardposition: cp,
                                             phone: p,
                                             email: e,
                                             motto: pull.rows.item(
                                                        record).motto.replace(
                                                        /&#x27;/g, "'"),
                                             cardId: pull.rows.item(
                                                         record).id.toString(),
                                             mainsite: main,
                                             URL1: w1,
                                             URL2: w2,
                                             URL3: w3,
                                             URL4: w4,
                                             spColor: spC,
                                             cardStatus: "",
                                             connection: parseInt(
                                                             get_contact_info(
                                                                 pull.rows.item(
                                                                     record).id.toString(
                                                                     ),
                                                                 "relation")),
                                             cardback: card,
                                             cardsymbol: symbol,
                                             cardtext: text,
                                             cardcat: pull.rows.item(
                                                          record).cat,
                                             imgsource: ava,
                                             thedesign: pull.rows.item(
                                                            record).cardback,
                                             cardsop: pull.rows.item(
                                                          record).cardsop,
                                             saved: 1
                                         })
                    }
                }
            }

            record = record + 1
        }
    })

    return 1
}

function torf(num) {

    /* Older versions of the Ubuntu SDK would return 1 if true and 0 if false, and then require the actual word
      true or false to be returned. This code is setup to return whatever is right whatever is set */
    var switcher = "true"
    switch (num) {
    case "true":
        switcher = "true"
        break
    case "false":
        switcher = "false"
        break
    case 0:
        switcher = "false"
        break
    default:
        switcher = "true"
        break
    }

    return switcher
}

function show_Sites(cid, list) {

    var dataStr
    var usesop
    var ava

    var dbtable = ""
    switch (list) {
    case "temp":
        dbtable = "TempCards"
        break
    case "region":
        dbtable = "RegCards"
        break
    }

    if (cid !== "local") {
        if (list !== "saved") {
            dataStr = "SELECT * FROM " + dbtable + " WHERE id ='" + cid + "'"
            usesop = 1
        } else {
            dataStr = "SELECT * FROM SavedCards WHERE id ='" + cid + "'"
            usesop = 1
        }
    } else {

        dataStr = "SELECT * FROM Card WHERE id ='" + list + "'"
        usesop = 0
    }

    webview1 = "empty.html"
    webview2 = "empty.html"
    webview3 = "empty.html"
    webview4 = "empty.html"
    mainview = "empty.html"

    var sop

    var cardbackis

    if (list === "preview") {

        console.log("From Show Sites:" + currentcard_thecard)

        var spC = seperatorColor1
        for (var num = 0; num < category_list.split(
                 ",").length; num = num + 1) {

            if (currentcard_cardcat === category_list.split(",")[num].split(
                        "::")[0]) {

                if (category_list.split(",")[num].split("::")[1] !== "none") {
                    spC = category_list.split(",")[num].split("::")[1]
                } else {
                    spC = seperatorColor1
                }
            }
        }
        var about = []

        about = currentcard_motto.replace(/&#x27;/g, "'").split(";::;")

        pagelist.append({
                            webpage: "empty.html",
                            thestate: "Home",
                            pagewidth: mainScreen.width,
                            pageheight: mainScreen.height,
                            motto: about[0],
                            skills: about[1],
                            school: about[2],
                            work: about[3],
                            cardId: currentcard_thecard,
                            avatarimg: currentcard_avatarimg,
                            companyname: currentcard_companyname.replace(
                                             /&#x27;/g, "'"),
                            cardusername: currentcard_username.replace(
                                              /&#x27;/g, "'"),
                            carduserphone: currentcard_userphone,
                            carduseremail: currentcard_useremail,
                            cardposition: currentcard_cardposition,
                            cardbackimg: cardbackis,
                            cardsop: currentcard_cardsop,
                            cardcat: currentcard_cardcat,
                            saved: currentcard_saved,
                            realcardback: currentcard_realcardback,
                            spColor: spC,
                            cardStatus: "Here on CafeSync",
                            connection: parseInt(get_contact_info(
                                                     currentcard_thecard,
                                                     "relation")),
                            mainsite: currentcard_mainsite,
                            URL1: currentcard_url1,
                            URL2: currentcard_url2,
                            URL3: currentcard_url3,
                            URL4: currentcard_url4,
                            pageindex: pages
                        })

        if (currentcard_mainsite.length > 8) {
            pages = pages + 1

            mainview = currentcard_mainsite

            if (mainview != "http://empty.html") {
                pagelist.append({
                                    webpage: mainview,
                                    thestate: "Active",
                                    pagewidth: mainScreen.width,
                                    pageheight: mainScreen.height,
                                    thecard: currentcard_thecard,
                                    cardId: "",
                                    avatarimg: "",
                                    companyname: "",
                                    cardusername: "",
                                    carduserphone: "",
                                    carduseremail: "",
                                    cardbackimg: "",
                                    motto: "",
                                    cardsop: "",
                                    pageindex: pages
                                })
            }
        }

        if (currentcard_url1.length > 8) {
            pages = pages + 1

            webview1 = currentcard_url1

            if (webview1 != "http://") {
                pagelist.append({
                                    webpage: webview1,
                                    thestate: "Active",
                                    pagewidth: mainScreen.width,
                                    pageheight: mainScreen.height,
                                    thecard: currentcard_thecard,
                                    cardId: "",
                                    avatarimg: "",
                                    companyname: "",
                                    cardusername: "",
                                    carduserphone: "",
                                    carduseremail: "",
                                    cardbackimg: "",
                                    motto: "",
                                    cardsop: "",
                                    pageindex: pages
                                })
            }
        }

        if (currentcard_url2.length > 8) {

            pages = pages + 1
            webview2 = currentcard_url2

            if (webview2 != "http://empty.html") {
                pagelist.append({
                                    webpage: webview2,
                                    thestate: "Active",
                                    pagewidth: mainScreen.width,
                                    pageheight: mainScreen.height,
                                    thecard: currentcard_thecard,
                                    cardId: "",
                                    avatarimg: "",
                                    companyname: "",
                                    cardusername: "",
                                    carduserphone: "",
                                    carduseremail: "",
                                    cardbackimg: "",
                                    motto: "",
                                    cardsop: "",
                                    pageindex: pages
                                })
            }

            //console.log(webview1);
        }

        if (currentcard_url3.length > 8) {

            pages = pages + 1
            webview3 = currentcard_url3

            if (webview3 != "http://empty.html") {
                pagelist.append({
                                    webpage: webview3,
                                    thestate: "Active",
                                    pagewidth: mainScreen.width,
                                    pageheight: mainScreen.height,
                                    thecard: currentcard_thecard,
                                    cardId: "",
                                    avatarimg: "",
                                    companyname: "",
                                    cardusername: "",
                                    carduserphone: "",
                                    carduseremail: "",
                                    cardbackimg: "",
                                    motto: "",
                                    cardsop: "",
                                    pageindex: pages
                                })
            }
        }

        if (currentcard_url4.length > 8) {

            pages = pages + 1
            webview4 = currentcard_url4

            if (webview4 != "http://empty.html") {
                pagelist.append({
                                    webpage: webview4,
                                    thestate: "Active",
                                    pagewidth: mainScreen.width,
                                    pageheight: mainScreen.height,
                                    thecard: currentcard_thecard,
                                    cardId: "",
                                    avatarimg: "",
                                    companyname: "",
                                    cardusername: "",
                                    carduserphone: "",
                                    carduseremail: "",
                                    cardbackimg: "",
                                    motto: "",
                                    cardsop: "",
                                    pageindex: pages
                                })
            }
        }
    } else {

        db.transaction(function (tx) {

            var pull = tx.executeSql(dataStr)

            if (pull.rows.item(0).cardback.search("internal:") === -1) {
                cardbackis = pull.rows.item(0).cardback
            } else {
                cardbackis = card_Set("background", 1)
            }
            var phonenumber
            var emailaddress

            if (pull.rows.item(0).phone === "Not Available") {
                phonenumber = "*******"
            } else {
                phonenumber = pull.rows.item(0).phone
            }

            if (pull.rows.item(0).email === "Not Available") {
                emailaddress = "*******"
            } else {
                emailaddress = pull.rows.item(0).email
            }

            if (usesop === 1) {
                sop = pull.rows.item(0).cardsop
            } else {
                sop = 1
            }

            if (pull.rows.item(0).avatar.length < 4) {
                ava = "img/default_avatar.png"
            } else {
                ava = pull.rows.item(0).avatar
                if (ava.search("/9j/4A") !== -1) {
                    if (ava.startsWith("data:image/jpeg;base64") === false) {
                        ava = "data:image/jpeg;base64, " + ava.replace(/ /g,
                                                                       "+")
                    } else {
                        ava = ava
                    }
                }
            }

            var spC = seperatorColor1
            for (var num = 0; num < category_list.split(
                     ",").length; num = num + 1) {

                if (pull.rows.item(0).cat === category_list.split(
                            ",")[num].split("::")[0]) {

                    if (category_list.split(",")[num].split(
                                "::")[1] !== "none") {
                        spC = category_list.split(",")[num].split("::")[1]
                    } else {
                        spC = seperatorColor1
                    }
                }
            }

            var about = []

            about = pull.rows.item(0).motto.replace(/&#x27;/g,
                                                    "'").split(";::;")

            pagelist.append({
                                webpage: "empty.html",
                                thestate: "Home",
                                pagewidth: mainScreen.width,
                                pageheight: mainScreen.height,
                                motto: about[0],
                                skills: about[1],
                                school: about[2],
                                work: about[3],
                                cardId: pull.rows.item(0).id.toString(),
                                avatarimg: ava,
                                companyname: pull.rows.item(0).company.replace(
                                                 /&#x27;/g, "'"),
                                cardusername: pull.rows.item(0).name.replace(
                                                  /&#x27;/g, "'"),
                                carduserphone: phonenumber,
                                carduseremail: emailaddress,
                                cardposition: pull.rows.item(0).alias,
                                cardbackimg: cardbackis,
                                cardsop: sop.toString(),
                                cardcat: pull.rows.item(0).cat,
                                saved: 0,
                                realcardback: pull.rows.item(0).cardback,
                                spColor: spC,
                                cardStatus: "Amazingly awesome early adopters",
                                connection: parseInt(get_contact_info(
                                                         pull.rows.item(
                                                             0).id.toString(),
                                                         "relation")),
                                mainsite: pull.rows.item(0).main,
                                URL1: pull.rows.item(0).website1,
                                URL2: pull.rows.item(0).website2,
                                URL3: pull.rows.item(0).website3,
                                URL4: pull.rows.item(0).website4,
                                pageindex: pages
                            })

            pagelist.append({
                                webpage: "empty.html",
                                thestate: "MicroBlog",
                                pagewidth: mainScreen.width,
                                pageheight: mainScreen.height,
                                motto: about[0],
                                skills: about[1],
                                school: about[2],
                                work: about[3],
                                cardId: currentcard_thecard,
                                avatarimg: currentcard_avatarimg,
                                companyname: currentcard_companyname.replace(
                                                 /&#x27;/g, "'"),
                                cardusername: currentcard_username.replace(
                                                  /&#x27;/g, "'"),
                                carduserphone: currentcard_userphone,
                                carduseremail: currentcard_useremail,
                                cardposition: currentcard_cardposition,
                                cardbackimg: cardbackis,
                                cardsop: currentcard_cardsop,
                                cardcat: currentcard_cardcat,
                                saved: currentcard_saved,
                                realcardback: currentcard_realcardback,
                                spColor: spC,
                                cardStatus: "Here on CafeSync",
                                mainsite: currentcard_mainsite,
                                URL1: currentcard_url1,
                                URL2: currentcard_url2,
                                URL3: currentcard_url3,
                                URL4: currentcard_url4,
                                pageindex: pages
                            })

            if (pull.rows.item(0).main.length > 8) {
                pages = pages + 1

                mainview = pull.rows.item(0).main

                if (mainview != "http://empty.html") {
                    pagelist.append({
                                        webpage: mainview,
                                        thestate: "Active",
                                        pagewidth: mainScreen.width,
                                        pageheight: mainScreen.height,
                                        thecard: pull.rows.item(
                                                     0).id.toString(),
                                        cardId: "",
                                        avatarimg: "",
                                        companyname: "",
                                        cardusername: "",
                                        carduserphone: "",
                                        carduseremail: "",
                                        cardbackimg: "",
                                        motto: "",
                                        cardsop: "",
                                        pageindex: pages
                                    })
                }
            }

            if (pull.rows.item(0).website1.length > 8) {
                pages = pages + 1
                webview1 = pull.rows.item(0).website1

                if (webview1 != "http://") {
                    pagelist.append({
                                        webpage: webview1,
                                        thestate: "Active",
                                        pagewidth: mainScreen.width,
                                        pageheight: mainScreen.height,
                                        thecard: pull.rows.item(
                                                     0).id.toString(),
                                        cardId: "",
                                        avatarimg: "",
                                        companyname: "",
                                        cardusername: "",
                                        carduserphone: "",
                                        carduseremail: "",
                                        cardbackimg: "",
                                        motto: "",
                                        cardsop: "",
                                        pageindex: pages
                                    })
                }
            }

            if (pull.rows.item(0).website2.length > 8) {

                pages = pages + 1
                webview2 = pull.rows.item(0).website2

                if (webview2 != "http://empty.html") {
                    pagelist.append({
                                        webpage: webview2,
                                        thestate: "Active",
                                        pagewidth: mainScreen.width,
                                        pageheight: mainScreen.height,
                                        thecard: pull.rows.item(
                                                     0).id.toString(),
                                        cardId: "",
                                        avatarimg: "",
                                        companyname: "",
                                        cardusername: "",
                                        carduserphone: "",
                                        carduseremail: "",
                                        cardbackimg: "",
                                        motto: "",
                                        cardsop: "",
                                        pageindex: pages
                                    })
                }
            }

            if (pull.rows.item(0).website3.length > 8) {

                pages = pages + 1
                webview3 = pull.rows.item(0).website3

                if (webview3 != "http://empty.html") {
                    pagelist.append({
                                        webpage: webview3,
                                        thestate: "Active",
                                        pagewidth: mainScreen.width,
                                        pageheight: mainScreen.height,
                                        thecard: pull.rows.item(
                                                     0).id.toString(),
                                        cardId: "",
                                        avatarimg: "",
                                        companyname: "",
                                        cardusername: "",
                                        carduserphone: "",
                                        carduseremail: "",
                                        cardbackimg: "",
                                        motto: "",
                                        cardsop: "",
                                        pageindex: pages
                                    })
                }
            }

            if (pull.rows.item(0).website4.length > 8) {

                pages = pages + 1
                webview4 = pull.rows.item(0).website4

                if (webview4 != "http://empty.html") {
                    pagelist.append({
                                        webpage: webview4,
                                        thestate: "Active",
                                        pagewidth: mainScreen.width,
                                        pageheight: mainScreen.height,
                                        thecard: pull.rows.item(
                                                     0).id.toString(),
                                        cardId: "",
                                        avatarimg: "",
                                        companyname: "",
                                        cardusername: "",
                                        carduserphone: "",
                                        carduseremail: "",
                                        cardbackimg: "",
                                        motto: "",
                                        cardsop: "",
                                        pageindex: pages
                                    })
                }
            }
        })
    }
}

function temp_Elapsed(cid) {
    var date = Date.now() / 1000

    var dataStr = "SELECT * FROM TempCards WHERE 1"
    var deleted = 0

    db.transaction(function (tx) {

        var pull = tx.executeSql(dataStr)

        var num = 0

        var deletedate = ""
        if (pull.rows.item(num).stamp.length > 10) {
            deletedate = (pull.rows.item(num).stamp / 1000) + (86400 * kT)
        } else {
            deletedate = pull.rows.item(num).stamp + (86400 * kT)
        }
        if (pull.rows.item(num).stamp !== 999) {
            console.log("Collected On " + pull.rows.item(num).stamp)
            console.log("time till deletion " + (deletedate - date) / 1200)

            if (deletedate < date) {
                delete_Card(cid, "temp")
                deleted = 1
            }
        }
        num = num + 1
    })

    return deleted
}

function delete_Card(cid, list) {

    if (list === "temp") {
        db.transaction(function (tx) {
            var tempDel = "DELETE FROM TempCards WHERE id ='" + cid + "'"
            tx.executeSql(tempDel)
        })
    }
    if (list === "saved") {
        db.transaction(function (tx) {
            var saveDel = "DELETE FROM SavedCards WHERE id ='" + cid + "'"
            tx.executeSql(saveDel)
        })
    }

    if (list === "region") {
        db.transaction(function (tx) {
            var tempDel = "DELETE FROM RegCards WHERE id ='" + cid + "'"
            tx.executeSql(tempDel)
        })
    }

    if (list === "global") {
        db.transaction(function (tx) {
            var tempDel = "DELETE FROM GlobCards WHERE id ='" + cid + "'"
            tx.executeSql(tempDel)
            //console.log("deleted"+cid);
        })
    }
}

function category_Search() {
    menuList.clear()

    var num = 0
    while (category_list.split(",")[num] !== undefined) {
        menuList.append({
                            menuitem: category_list.split(
                                          ",")[num].split("::")[0]
                        })
        num = num + 1
    }
}

function category_Set() {
    menuList.clear()

    var num = 0
    while (category_list.split(",")[num] !== undefined) {
        menuList.append({
                            menuitem: category_list.split(
                                          ",")[num].split("::")[0]
                        })
        num = num + 1
    }
}

function updateDB() {

    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE SavedCards')
        tx.executeSql('DROP TABLE TempCards')
        tx.executeSql('DROP TABLE Card')
        tx.executeSql('DROP TABLE Options')
    })
    return 1
}

function cardcreator() {
    var num = 0
    fbackground_list.clear()
    fsymbol_list.clear()
    ftext_list.clear()
    while (num < bgnum) {

        fbackground_list.append({
                                    index: num,
                                    img: "img/card/background-f/" + num + ".png"
                                })
        if (backgrounds.length < 2) {
            backgrounds = "img/card/background-f/" + num + ".png"
        } else {
            backgrounds = backgrounds + "," + "img/card/background-f/" + num + ".png"
        }

        num = num + 1
    }

    num = 0
    fsymbol_list.append({
                            index: num,
                            img: "img/card/symbols/" + num + ".png",
                            placement: -5
                        })

    num = 1
    while (num < symbolnum) {

        fsymbol_list.append({
                                index: num,
                                img: "img/card/symbols/" + num + ".png",
                                placement: -5
                            })
        symbols = symbols + ",img/card/symbols/" + num + ".png:-5"
        fsymbol_list.append({
                                index: num,
                                img: "img/card/symbols/" + num + ".png",
                                placement: 55
                            })
        symbols = symbols + ",img/card/symbols/" + num + ".png:55"

        num = num + 1
    }

    ftext_list.append({
                          ftitle: "",
                          ftitlesize: 0,
                          fHoffset: 0,
                          fVoffset: 0,
                          fsubtitle: "",
                          fsubtitlesize: 0,
                          fsHoffset: 0,
                          fsVoffset: 0
                      })
    text_Locations = '0:0:0'
    var company = ""
    var name = ""

    if (cardindex == 0) {

        if (usercompany.length > 1) {
            company = usercompany
            name = username
        } else {
            company = username
            name = ""
        }
    } else {

        if (usercompany1.length > 1) {
            company = usercompany1
            name = username1
        } else {
            company = username1
            name = ""
        }
    }

    var snum = 18
    while (snum < 25) {
        num = -30
        while (num < 40) {
            var vnum = -30
            while (vnum < 30) {
                ftext_list.append({
                                      ftitle: company,
                                      ftitlesize: snum,
                                      fHoffset: num,
                                      fVoffset: vnum,
                                      fsubtitle: name,
                                      fsubtitlesize: 30,
                                      fsHoffset: 35,
                                      fsVoffset: 70
                                  })

                if (text_Locations.length < 2) {
                    text_Locations = snum + ':' + num + ':' + vnum
                } else {
                    text_Locations = text_Locations + "," + snum + ':' + num + ':' + vnum
                }

                vnum = vnum + 30
            }
            num = num + 10
        }
        snum = snum + 10
    }
}

function listimages() {
    var dataStr = "SELECT  *  FROM LIBRARY WHERE 1"
    var num = 0

    previousimages.clear()

    db.transaction(function (tx) {

        var pull = tx.executeSql(dataStr)

        while (num < pull.rows.length) {

            previousimages.append({
                                      imgsource: "file://" + paths.split(
                                                     ",")[2].trim(
                                          ) + pull.rows.item(num).file
                                  })

            num = num + 1
        }
    })
}

//Image stuff //
function store_img(where, file, private) {

    var testStr = "SELECT  *  FROM LIBRARY WHERE 1"

    var d = new Date()

    var thedate = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear()

    var base64 = file.split(":;:")[1]

    var data = [userid, where, file.split(
                    ":;:")[2] + ".jpg", thedate, private, 9999999, base64]

    var insert = "INSERT INTO LIBRARY VALUES(?,?,?,?,?,?,?)"

    db.transaction(function (tx) {

        tx.executeSql(insert, data)
    })
}

function delete_Img(file) {

    var deletes = " DELETE FROM `LIBRARY` WHERE file ='" + file + "'"

    db.transaction(function (tx) {

        tx.executeSql(deletes)
        notification1.visible = true
        notification1.themessage = "Deleted image"
        listimages()
    })
}

//stats
function totals() {

    var dataStr = "SELECT  id  FROM TempCards WHERE `id` !='" + usercardNum + "' AND `id` !=''"
    var dataStr1 = "SELECT  id  FROM SavedCards WHERE `id` !='" + usercardNum + "' AND `id` !=''"

    db.transaction(function (tx) {

        var pull = tx.executeSql(dataStr)
        var pull1 = tx.executeSql(dataStr1)

        ctotal = pull1.rows.length
        ptotal = pull.rows.length

        if (ctotal == -1) {
            ctotal = 0
        }
        if (ptotal == -1) {
            ptotal = 0
        }
    })
}

function fillsites() {
    var bg
    var srl
    var sourceset

    socialcontracts.clear()
    if (usermain.length > 1) {

        sourceset = socialsetup(usermain.split("::")[0])
        srl = sourceset.split("::")[2]
        bg = sourceset.split("::")[1]

        socialcontracts.append({
                                   type: 1,
                                   service: usermain.split("::")[0],
                                   source: usermain.split("::")[1],
                                   bgcolor: bg,
                                   serviceLogo: srl,
                                   po: 0
                               })
    }

    if (website1.length > 1) {

        sourceset = socialsetup(website1.split("::")[0])
        srl = sourceset.split("::")[2]
        bg = sourceset.split("::")[1]

        socialcontracts.append({
                                   type: 1,
                                   service: website1.split("::")[0],
                                   source: website1.split("::")[1],
                                   bgcolor: bg,
                                   serviceLogo: srl,
                                   po: 1
                               })
    }

    if (website2.length > 1) {

        sourceset = socialsetup(website2.split("::")[0])
        srl = sourceset.split("::")[2]
        bg = sourceset.split("::")[1]

        socialcontracts.append({
                                   type: 1,
                                   service: website2.split("::")[0],
                                   source: website2.split("::")[1],
                                   bgcolor: bg,
                                   serviceLogo: srl,
                                   po: 2
                               })
    }

    if (website3.length > 1) {

        sourceset = socialsetup(website3.split("::")[0])
        srl = sourceset.split("::")[2]
        bg = sourceset.split("::")[1]

        socialcontracts.append({
                                   type: 1,
                                   service: website3.split("::")[0],
                                   source: website3.split("::")[1],
                                   bgcolor: bg,
                                   serviceLogo: srl,
                                   po: 3
                               })
    }

    if (website4.length > 1) {

        sourceset = socialsetup(website4.split("::")[0])
        srl = sourceset.split("::")[2]
        bg = sourceset.split("::")[1]

        socialcontracts.append({
                                   type: 1,
                                   service: website4.split("::")[0],
                                   source: website4.split("::")[1],
                                   bgcolor: bg,
                                   serviceLogo: srl,
                                   po: 4
                               })
    }

    if (usermain.length <= 1) {
        socialcontracts.append({
                                   type: 2,
                                   service: "",
                                   source: qsTr("Add New Source"),
                                   bgcolor: cardcolor,
                                   serviceLogo: "./icons/add.svg",
                                   po: 0
                               })
    } else if (website1.length <= 1) {
        socialcontracts.append({
                                   type: 2,
                                   service: "",
                                   source: qsTr("Add New Source"),
                                   bgcolor: cardcolor,
                                   serviceLogo: "./icons/add.svg",
                                   po: 1
                               })
    } else if (website2.length <= 1) {

        socialcontracts.append({
                                   type: 2,
                                   service: "",
                                   source: qsTr("Add New Source"),
                                   bgcolor: cardcolor,
                                   serviceLogo: "./icons/add.svg",
                                   po: 2
                               })
    } else if (website3.length <= 1) {

        socialcontracts.append({
                                   type: 2,
                                   service: "",
                                   source: qsTr("Add New Source"),
                                   bgcolor: cardcolor,
                                   serviceLogo: "./icons/add.svg",
                                   po: 3
                               })
    } else if (website4.length <= 1) {

        socialcontracts.append({
                                   type: 2,
                                   service: "",
                                   source: qsTr("Add New Source"),
                                   bgcolor: cardcolor,
                                   serviceLogo: "./icons/add.svg",
                                   po: 4
                               })
    }
}

function socialsetup(source) {
    var ssinfo = "not found::black::./icons/stock_website.svg"

    for (var num = 0; num < slist.length; num = num + 1) {

        if (slist[num].search(source) !== -1) {
            ssinfo = slist[num]
        }
    }

    return ssinfo
}

function schoolListings() {
    var slist = usermotto.split(";::;")[2]

    school.clear()

    if (yourschooling.length < slist.split(",").length) {

        for (var num = 0; num < slist.split(",").length; num = num + 1) {

            yourschooling.push(slist.split(",")[num])
        }
    }

    var schoolnum = 0
    while (yourschooling.length > schoolnum) {

        if (yourschooling[schoolnum].split(":::")[0] !== "") {

            school.append({
                              name: yourschooling[schoolnum].split(":::")[0],
                              graduated: yourschooling[schoolnum].split(
                                  ":::")[1],
                              discription: yourschooling[schoolnum].split(
                                  ":::")[2],
                              compeltiondate: yourschooling[schoolnum].split(
                                  ":::")[3],
                              degree: yourschooling[schoolnum].split(":::")[4]
                          })
        }
        schoolnum = schoolnum + 1
    }
}

function workListings() {
    var wlist = usermotto.split(";::;")[3]

    workexpr.clear()

    if (yourworked.length < wlist.split(",").length) {

        for (var num = 0; num < wlist.split(",").length; num = num + 1) {

            yourworked.push(wlist.split(",")[num])
        }
    }

    var worknum = 0
    while (yourworked.length > worknum) {

        if (yourworked[worknum].split(":::")[0] !== "") {
            workexpr.append({
                                name: yourworked[worknum].split(":::")[0],
                                currentlyEmployeed: yourworked[worknum].split(
                                    ":::")[1],
                                discription: yourworked[worknum].split(
                                    ":::")[2],
                                beginingdate: yourworked[worknum].split(
                                    ":::")[3],
                                endingdate: yourworked[worknum].split(":::")[4],
                                years: yourworked[worknum].split(":::")[5]
                            })
        }
        worknum = worknum + 1
    }
}

function skillListings() {
    var slist = usermotto.split(";::;")[1]
    skills.clear()

    if (yourskills.length < slist.split(",").length) {

        for (var num = 0; num < slist.split(",").length; num = num + 1) {

            yourskills.push(slist.split(",")[num])
        }
    }

    var skillnum = 0
    while (yourskills.length > skillnum) {

        if (yourskills[skillnum].split(":::")[0] !== "") {
            skills.append({
                              name: yourskills[skillnum].split(":::")[0],
                              certified: yourskills[skillnum].split(":::")[1],
                              discription: yourskills[skillnum].split(":::")[2],
                              redate: yourskills[skillnum].split(":::")[3],
                              expdate: yourskills[skillnum].split(":::")[4],
                              yoe: yourskills[skillnum].split(":::")[5]
                          })
        }

        skillnum = skillnum + 1
    }
}

function editItem(type, index) {

    switch (type) {
    case "skill":
        if (yourskills[index].split(":::")[0] !== "") {

            skillname.text = yourskills[index].split(":::")[0].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            certifed.checked = yourskills[index].split(":::")[1].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            skillDiscription.text = yourskills[index].split(":::")[2].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            skillstartdate.text = yourskills[index].split(":::")[3].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            skillexpiredate.text = yourskills[index].split(":::")[4].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            years.text = yourskills[index].split(":,:")[5].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
        }
        ;
        break
    case "school":
        if (yourschooling[index].split(":::")[0] !== "") {

            schoolname.text = yourschooling[index].split(":::")[0].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            graduated.checked = yourschooling[index].split(":::")[1].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            schoolDiscription.text = yourschooling[index].split(":::")[2].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            graddate.text = yourschooling[index].split(":::")[3].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            degree.text = yourschooling[index].split(":::")[4].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
        }
        ;
        break
    case "work":
        if (yourworked[index].split(":::")[0] !== "") {

            companyname.text = yourworked[index].split(":::")[0].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            currentlyEmployeed.checked = yourworked[index].split(
                        ":::")[1].split("'")[1].replace(/;#x2c;/g,
                                                        ",").replace(/;#x2b;/g,
                                                                     "+")
            workDiscription.text = yourworked[index].split(":::")[2].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            workstartdate.text = yourworked[index].split(":::")[3].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            workleftdate.text = yourworked[index].split(":::")[4].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
            workyears.text = yourworked[index].split(":::")[5].split(
                        "'")[1].replace(/;#x2c;/g, ",").replace(/;#x2b;/g, "+")
        }
        ;
        break
    }
}

function formatResume(type, stuff) {
    var num = 0

    switch (type) {
    case "skill":
        for (num = 0; num < stuff.split(",").length; num = num + 1) {
            if (stuff.split(",")[num].split(":::")[0] !== "") {
                skillstats.append({
                                      name: stuff.split(",")[num].split(
                                          ":::")[0],
                                      certified: stuff.split(",")[num].split(
                                          ":::")[1],
                                      discription: stuff.split(",")[num].split(
                                          ":::")[2],
                                      redate: stuff.split(",")[num].split(
                                          ":::")[3],
                                      expdate: stuff.split(",")[num].split(
                                          ":::")[4],
                                      yoe: stuff.split(",")[num].split(":::")[5]
                                  })
            }
        }
        ;
        break
    case "school":
        for (num = 0; num < stuff.split(",").length; num = num + 1) {
            if (stuff.split(",")[num].split(":::")[0] !== "") {
                schoolstats.append({
                                       name: stuff.split(",")[num].split(
                                           ":::")[0],
                                       certified: stuff.split(",")[num].split(
                                           ":::")[1],
                                       discription: stuff.split(",")[num].split(
                                           ":::")[2],
                                       redate: stuff.split(",")[num].split(
                                           ":::")[3],
                                       expdate: stuff.split(",")[num].split(
                                           ":::")[4],
                                       yoe: stuff.split(
                                                ",")[num].split(":::")[5]
                                   })
            }
        }
        ;
        break
    case "work":
        for (num = 0; num < stuff.split(",").length; num = num + 1) {
            if (stuff.split(",")[num].split(":::")[0] !== "") {
                workstats.append({
                                     name: stuff.split(",")[num].split(
                                         ":::")[0],
                                     certified: stuff.split(",")[num].split(
                                         ":::")[1],
                                     discription: stuff.split(",")[num].split(
                                         ":::")[2],
                                     redate: stuff.split(",")[num].split(
                                         ":::")[3],
                                     expdate: stuff.split(",")[num].split(
                                         ":::")[4],
                                     yoe: stuff.split(",")[num].split(":::")[5]
                                 })
            }
        }
        ;
        break
    }
}

function load_Stat(statname) {
    var theReturn = 0
    var teststr = "SELECT  * FROM Stats WHERE id= '" + userid + "' AND name ='" + statname + "'"
    db.transaction(function (tx) {

        var test = tx.executeSql(teststr)
        if (test.rows.length !== 0) {
            theReturn = test.rows.item(0).data
        } else {

            theReturn = 0
        }
    })

    return theReturn
}

function save_Stat(id, statname, data) {
    var teststr = "SELECT  * FROM Stats WHERE id= '" + id + "' AND name ='" + statname + "'"
    var thedata = [id, statname, data, 0]
    var update = "UPDATE Stats SET data='" + data + "' WHERE id= '" + id
            + "' AND name ='" + statname + "'"
    var Str = "INSERT INTO Stats VALUES(?,?,?,?)"

    db.transaction(function (tx) {

        var test = tx.executeSql(teststr)
        if (test.rows.length === 0) {
            tx.executeSql(Str, thedata)
        } else {

            tx.executeSql(update)
        }
    })
}

function save_setting(id, thevalue) {
    var update = "UPDATE Settings SET value=" + thevalue + " WHERE id= '" + id + "'"

    db.transaction(function (tx) {
        tx.executeSql(update)

        if (id === "theme") {
            var teststr = tx.executeSql("SELECT  * FROM Themes WHERE 1")

            backgroundColor = teststr.rows.item(thevalue).backgroundColor
            highLightColor1 = teststr.rows.item(thevalue).highLightColor
            seperatorColor1 = teststr.rows.item(thevalue).seperatorColor
            barColor = teststr.rows.item(thevalue).barColor
            activeColor = teststr.rows.item(thevalue).activeColor
            cardcolor = teststr.rows.item(thevalue).cardcolor
            overlayColor = teststr.rows.item(thevalue).overlayColor
            fontColorTitle = teststr.rows.item(thevalue).fontColorTitle
            fontColor = teststr.rows.item(thevalue).fontColor
        }
    })
}

function save_contact_info(contactid, information, type) {

    // adds / updates data in the ContactInfo database //
    var insert = "INSERT INTO ContactInfo VALUES(?,?,?)"
    var thedata = [contactid, information, type]
    var update = "UPDATE ContactInfo SET information='" + information
            + "' WHERE type='" + type + "' AND contactid='" + contactid + "'"

    db.transaction(function (tx) {

        var pull = tx.executeSql("SELECT * FROM ContactInfo WHERE contactid='"
                                 + contactid + "' AND type ='" + type + "'")

        if (pull.rows.length === 1) {
            tx.executeSql(update)
        } else {
            tx.executeSql(insert, thedata)
        }
    })
}

function get_contact_info(contactid, type) {

    // finds and retrieves data in the ContactInfo database //
    var valuereturn = 0
    db.transaction(function (tx) {

        var pull = tx.executeSql("SELECT * FROM ContactInfo WHERE contactid='"
                                 + contactid + "' AND type ='" + type + "'")

        if (pull.rows.length === 1) {

            valuereturn = pull.rows.item(0).information
        } else {

            valuereturn = 0
        }
    })
    return valuereturn
}
