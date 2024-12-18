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

`DemoStats1` business object definition
---------------------------------------

Statistics per statuses

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `demoOrdStatus`                                              | enum(30) using `DEMO_ORD_STATUS` list    | yes      | yes       |          | Order status                                                                     |
| `demoStsCount`                                               | int(10)                                  |          | yes       |          | -                                                                                |
| `demoStsQuantities`                                          | int(10)                                  |          | yes       |          | Ordered quantities                                                               |
| `demoStsTotals`                                              | float(10, 2)                             |          | yes       |          | Ordered amount                                                                   |

### Lists

* `DEMO_ORD_STATUS`
    - `P` Pending status
    - `H` On hold
    - `V` Validated status
    - `D` Shipped status
    - `C` Canceled status

`DemoStats2` business object definition
---------------------------------------

Stats per products

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `demoStsRowId` link to **`DemoProduct`**                     | id                                       |          | yes       |          | -                                                                                |
| _Ref. `demoStsRowId.demoPrdReference`_                       | _regexp(10)_                             |          |           |          | _Product reference_                                                              |
| _Ref. `demoStsRowId.demoPrdName`_                            | _char(100)_                              |          |           |          | _Product name_                                                                   |
| _Ref. `demoStsRowId.demoPrdAvailable`_                       | _boolean_                                |          |           |          | _Available product?_                                                             |
| _Ref. `demoStsRowId.demoPrdStock`_                           | _int(11)_                                |          |           |          | _Current stock for product_                                                      |
| `demoStsCount`                                               | int(10)                                  |          | yes       |          | -                                                                                |
| `demoStsQuantities`                                          | int(10)                                  |          | yes       |          | Ordered quantities                                                               |
| `demoStsTotals`                                              | float(10, 2)                             |          | yes       |          | Ordered amount                                                                   |

### Custom actions

* `DEMO_STS2_AVAILABLE`: 
* `DEMO_STS2_NOT_AVAILABLE`: 

`DemoDashboard` external object definition
------------------------------------------

Demo dashboard (using Google charts)


