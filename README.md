<!--
 ___ _            _ _    _ _    __
/ __(_)_ __  _ __| (_)__(_) |_ /_/
\__ \ | '  \| '_ \ | / _| |  _/ -_)
|___/_|_|_|_| .__/_|_\__|_|\__\___|
            |_| 
-->
![](https://docs.simplicite.io//logos/logo250.png)
* * *

`DemoDashboard` module definition
=================================

### Introduction

This module contains a custom dashboard for the demo **order management** application.:

### Prerequisites

The `Demo` module **must** be installed and configured before importing this addon module.

### Import

To import this module:

- Create a module named `DemoDashboard`
- Set the settings as:

```json
{
	"type": "git",
	"origin": {
		"uri": "https://github.com/simplicitesoftware/module-demo-dashboard.git"
	}
}
```

- Click on the _Import module_ button


`DemoStats` business object definition
--------------------------------------

Statistics (query object)

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      | 
| ------------------------------------------------------------ | ---------------------------------------- | -------- | --------- | -------- | -------------------------------------------------------------------------------- |
| `demoOrdStatus`                                              | enum(30) using `DEMO_ORD_STATUS` list    | yes      | yes       |          | Order status                                                                     |
| `demoStsCount`                                               | int(10)                                  |          | yes       |          | -                                                                                |
| `demoStsQuantity`                                            | int(10)                                  |          | yes       |          | Ordered quantities                                                               |
| `demoStsAmount`                                              | float(10, 2)                             |          | yes       |          | Ordered amount                                                                   |

### Lists

* `DEMO_ORD_STATUS`
    - `P` Pending status
    - `V` Validated status
    - `D` Shipped status
    - `C` Canceled status

`DemoDashboard` external object definition
------------------------------------------

Demo dashboard (using Google charts)


